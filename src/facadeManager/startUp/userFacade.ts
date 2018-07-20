/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/4/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 * := Modified By: Md. Nazmus Salahin
 *
 **/
import RequestMessage from '../../core/requestMessage';
import {MessageConstant} from '../../core/messageConstant';
import ResponseMessage from '../../core/responseMessage';
import Utils from '../../utils/utils';
import UserVM from "../../models/startUp/VMuser";
import * as Models from "../../models/startUp";
import * as BLL from "../../bllManager/startUp"
import * as BLLAccount from "../../bllManager/accounting"
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as _ from 'lodash';
import Authentication from "../../security/authentication";
import TokenModel from "../../security/tokenModel";
import MailSender from "../../utils/mailSender";
import * as Enums from "../../core/enum/enums";
import UserBusinessRightMapperModel from "../../models/startUp/userBusinessRightMapperModel";
import {Inject} from "typescript-ioc";

export default class UserFacade extends BaseFacade {

    @Inject
    userBll: BLL.user;// = new BLL.user();
    @Inject
    sessionBll: BLL.session; // = new BLL.session();
    @Inject
    businessBll: BLL.business; //= new BLL.business();
    @Inject
    userBusinessRightMapperBll: BLL.userBusinessRightMapper; // = new BLL.userBusinessRightMapper();
    @Inject
    accessRightBll: BLL.accessRight;// = new BLL.accessRight();
    @Inject
    userInvitationTokenBll: BLL.userInvitationToken;// = new BLL.userInvitationToken();

    @Inject
    accountBll: BLLAccount.account;

    authentication: Authentication = new Authentication();

    constructor() {
        super();
    }

    async saveUser(reqMessage: RequestMessage) {
        Utils.logger('Sign up request with');

        let isExistingUser: boolean,
            userModel: Models.user,
            resMessage,
            userInvitationModel: Models.userInvitation,
            businessModel: Models.business,
            userBusinessRightMapperModel: Models.userBusinessRightMapper,
            whereCondition = this.customObject,
            createdUserModel:Models.user=null,
            isCOAcreated:boolean=false,
            createdBusinessModel: Models.business = null;

        try {
            userModel = <Models.user>reqMessage.requestObj;

            isExistingUser = await this.userBll.isUserExist(userModel.userID);

            if (_.isEqual(reqMessage.token, "") || reqMessage.token == null) {
                // complete new user
                if (isExistingUser == false) {
                    //await this.startTransaction();

                    createdUserModel = await this.userBll.saveUser(userModel);
                    createdBusinessModel  = await this.businessBll.createBusiness(userModel,'123456');
                    isCOAcreated = await this.accountBll.createCOAByBusinessID(createdBusinessModel.businessID);


                    //let tranResult = await this.endTransaction();
                    //if (tranResult != null)

                    if(createdBusinessModel!=null && createdUserModel!=null && isCOAcreated)
                        resMessage = this.getResponseMessBuilder(MessageConstant.SIGN_UP_SUCCESSFULLY, userModel, MessageConstant.SUCCESS_CODE);

                } else {
                    resMessage = this.getResponseMessBuilder(MessageConstant.DUPLICATE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            } else {
                // Invited user
                whereCondition = new Object();
                whereCondition.token = reqMessage.token;
                userInvitationModel = await this.userInvitationTokenBll.getOneByCondition(whereCondition, 'valid invitation token');

                if (userInvitationModel != null) {
                    userModel = reqMessage.requestObj;
                    if (!isExistingUser) {
                        userModel = await this.userBll.saveUser(userModel); // only create user not business
                    }

                    whereCondition = new Object();
                    whereCondition.businessID = userInvitationModel.businessID;

                    businessModel = await this.businessBll.getOneByCondition(whereCondition, 'get businessModel');
                    if (businessModel != null && userModel != null) {

                        userBusinessRightMapperModel = new Models.userBusinessRightMapper();
                        userBusinessRightMapperModel.userID = userModel.userID;
                        userBusinessRightMapperModel.businessID = businessModel.businessID;
                        userBusinessRightMapperModel.accessRightID = userInvitationModel.accessRightID;
                        userBusinessRightMapperModel.firstName = userInvitationModel.firstName;
                        userBusinessRightMapperModel.lastName = userInvitationModel.lastName;
                        userBusinessRightMapperModel = await this.userBusinessRightMapperBll.save(userBusinessRightMapperModel, 'get userBusinessRightMapper');

                        //get businessOwnerID from the businessID and send confirmation mail to that ID

                        let message;
                        message = userModel.userID + " has accepted your business invitation";
                        Utils.logger('message ', message);
                        MailSender.mailSend(businessModel.owner, 'Mail From TillboxWeb[Confirmation from Invite User]', message);

                        if (userBusinessRightMapperModel != null) {
                            whereCondition = new Object();
                            whereCondition.userID = userBusinessRightMapperModel.userID;
                            whereCondition.businessID = userBusinessRightMapperModel.businessID;
                            let invitationModels = await this.userInvitationTokenBll.getAllByCondition(whereCondition, 'get all token');

                            for (let i = 0; i < invitationModels.length; i++) {
                                let userInvitationModel: Models.userInvitation = invitationModels[i];
                                userInvitationModel.done = true;

                                whereCondition = new Object();
                                whereCondition.token = userInvitationModel.token;
                                userInvitationModel = await this.userInvitationTokenBll.updateByCondition(userInvitationModel, whereCondition, 'update userInvite');
                                Utils.logger("updated userInvitationModel ", userInvitationModel);
                            }
                            resMessage = this.getResponseMessBuilder(MessageConstant.SIGN_UP_SUCCESSFULLY, reqMessage.requestObj, MessageConstant.SUCCESS_CODE, "", businessModel.businessID);
                        } else {
                            resMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SIGN_UP, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                        }
                    } else {
                        resMessage = this.getResponseMessBuilder(MessageConstant.INVALID_BUSINESSID, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                    }
                } else {
                    resMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            }
        } catch (err) {
            Utils.logger("userFacade Error: ", err);
            //await this.destroyTransaction();
            resMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SIGN_UP, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('userFacade', reqMessage.requestObj, err);
        }
        return resMessage;
    }

    async userSignIn(reqMessage: RequestMessage) {
        let result: ResponseMessage, whereCondition = this.customObject;
        try {
            let userModel = reqMessage.requestObj;
            userModel = await this.userBll.getUser(userModel);
            Utils.logger('userModel result ', userModel);

            if (userModel != null) {
                let logInResponseModel: Models.logInResponse = new Models.logInResponse();
                logInResponseModel.setUser(userModel);

                whereCondition = new Object();
                whereCondition.userID = userModel.userID;

                let userBusinessRightMapperModels: Models.userBusinessRightMapper[] = await this.userBusinessRightMapperBll.getAllByCondition(whereCondition, 'get all businessList');
                let businessModelList = new Array<Models.business>();
                if (userBusinessRightMapperModels != null && userBusinessRightMapperModels.length > 0) {
                    for (let i = 0; i < userBusinessRightMapperModels.length; i++) {

                        whereCondition = new Object();
                        whereCondition.businessID = userBusinessRightMapperModels[i].businessID;
                        let businessModel: Models.business = await this.businessBll.getOneByCondition(whereCondition, 'get business');
                        businessModelList.push(businessModel);
                    }
                }
                logInResponseModel.setBusinessList(businessModelList);

                let sessionModel: Models.session = null;
                if (businessModelList.length == 1) {
                    //Single business
                    sessionModel = await this.sessionBll.createUserSession(
                        userModel.userID, businessModelList[0].businessID, businessModelList[0].businessDBName);
                } else {
                    //Multiple business
                    sessionModel = await this.sessionBll.createUserSession(
                        userModel.userID, 0, "");
                }

                logInResponseModel.setSession(sessionModel);

                result = this.getResponseMessBuilder(MessageConstant.SUCCESSFULLY_LOGIN, logInResponseModel, MessageConstant.SUCCESS_CODE, sessionModel.token, sessionModel.businessID);
            } else {
                result = this.getResponseMessBuilder(MessageConstant.FAILED_TO_LOGIN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            }
        } catch (err) {
            Utils.logger("user facade sign in error: ", err);
            result = this.getResponseMessBuilder(MessageConstant.FAILED_TO_LOGIN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('userFacade', reqMessage.requestObj, err);
        }
        return result;
    }

    async getUserList(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            let decodedTokenModel: TokenModel = new TokenModel();
            decodedTokenModel.token = reqMessage.token;

            decodedTokenModel = await this.authentication.decodeToken(decodedTokenModel);
            Utils.logger('Token Data', decodedTokenModel);

            whereCondition = new Object();
            whereCondition.token = reqMessage.token;
            let sessionModel: Models.session = await this.sessionBll.getOneByCondition(whereCondition, 'session details');

            if (sessionModel != null && decodedTokenModel != null) {

                whereCondition = new Object();
                whereCondition.userID = sessionModel.userID;
                whereCondition.businessID = reqMessage.businessID;

                let userBusinessRightMapperModel: Models.userBusinessRightMapper = await this.userBusinessRightMapperBll.getOneByCondition(whereCondition, 'get userBusinessRightMapper');

                if (userBusinessRightMapperModel != null) {
                    whereCondition = new Object();
                    whereCondition.businessID = reqMessage.businessID;
                    let userRightMapperModelList: Array<Models.userBusinessRightMapper> =
                        await this.userBusinessRightMapperBll.getAllByCondition(whereCondition, 'get All userRigthMapperModelList');

                    let userModelList: Array<Models.user> = new Array<Models.user>();
                    for (let userRightMapperModel of userRightMapperModelList) {

                        whereCondition = new Object();
                        whereCondition.userID = userRightMapperModel.userID;
                        let userModel: Models.user = await this.userBll.getOneByCondition(whereCondition, 'get userModel');
                        userModelList.push(userModel);
                    }
                    responseMessage = this.getResponseMessBuilder(MessageConstant.GET_USER_LIST_SUCCESSFULLY, userModelList, MessageConstant.SUCCESS_CODE);
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_USER_LIST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.INVALID_TOKEN_CODE);
            }
        } catch (err) {
            Utils.logger("user facade get user list Error: ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_USER_LIST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('userFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    // Get List of (User 'active + inactive' + Invited user).
    async getUserActiveAndInactiveAndInvitedUserList(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let responseMessage: ResponseMessage, whereCondition = this.customObject;
        let vmUserList: Array<UserVM> = new Array<UserVM>();

        try {
            let decodedTokenModel: TokenModel = new TokenModel();
            decodedTokenModel.token = reqMessage.token;

            decodedTokenModel = await this.authentication.decodeToken(decodedTokenModel);
            Utils.logger('Token Data', decodedTokenModel);

            let sessionModel: Models.session = new Models.session();
            //Utils.logger("session: ", sessionModel);
            if (sessionModel != null && decodedTokenModel != null) {
                let businessID: number = reqMessage.requestObj.businessID;

                // (a-1) get all users Mapper (active and inactive)
                whereCondition = new Object();
                whereCondition.businessID = businessID;
                whereCondition.status = [Enums.Status.Active, Enums.Status.Inactive];
                let userMapperList: UserBusinessRightMapperModel[] = await this.userBusinessRightMapperBll.getAllByCondition(whereCondition, 'getUserListActiveInactiveByBusinessID');
                // (a-2) create VMUser.
                Utils.logger('dum', userMapperList);
                for (let row of userMapperList) {
                    let vmUser: UserVM = await this.userBll.createInviteUserFromUserRightMapperModel(row);
                    vmUserList.push(vmUser);
                }

                // (b-1) get all Invited User List
                //let userInvitationTokenBll: BLL.userInvitationToken = new BLL.userInvitationToken();

                let userInvitedModelList: Array<Models.userInvitation> = await this.userInvitationTokenBll.getUserListPendingByBusinessId(businessID.toString());
                // (b-2) create VMUser.
                for (let row of userInvitedModelList) {
                    let vmUser: UserVM = await this.userBll.createInviteUserFromUserInvitationToken(row);
                    vmUserList.push(vmUser);
                }
                // (c-1) get all access Right list
                let AccessRightModelList;
                AccessRightModelList = await this.accessRightBll.getAll('get all accessRight');

                // (d) Get and set Business Owner.
                whereCondition = new Object();
                whereCondition.businessID = businessID;

                let businessModel: Models.business = await this.businessBll.getOneByCondition(whereCondition, 'get business');
                if (businessModel != null) {
                    var vmUserOwner = vmUserList.filter(function (vmUser) {
                        return vmUser.userModel.userID == businessModel.owner;
                    });

                    if (vmUserOwner.length > 0) {
                        vmUserList.filter(function (vmUser) {
                            return vmUser.userModel.userID == businessModel.owner;
                        })[0].isBusinessOwner = true;
                    }
                }

                // (e) Set Final object
                let vmUserBusiness: Models.VMuserBusiness = new Models.VMuserBusiness();
                vmUserBusiness.accessRightList = AccessRightModelList;
                vmUserBusiness.vmUserList = vmUserList;

                responseMessage = this.getResponseMessBuilder(MessageConstant.GET_USER_LIST_SUCCESSFULLY, vmUserBusiness, MessageConstant.SUCCESS_CODE);

            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE);
            }
        } catch (err) {
            Utils.logger("user facade get user list Error: ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_USER_LIST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('userFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async editUser(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('editUser from userFacade !');
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        let userBusinessRightMapperModel: Models.userBusinessRightMapper = new Models.userBusinessRightMapper();

        let reqObj, givenUserID;
        reqObj = reqMessage.requestObj;
        givenUserID = reqObj.userID;

        try {
            let isValidUser, updateUserMapperModel: any = null;
            whereCondition = new Object();
            whereCondition.userID = givenUserID;
            whereCondition.businessID = reqMessage.businessID;

            isValidUser = await this.userBusinessRightMapperBll.getOneByCondition(whereCondition, 'isValid user');

            if (isValidUser != null) {
                //if the user is owner, then don't update accessRightId

                whereCondition = new Object();
                whereCondition.businessId = reqMessage.businessID;
                let getBusinessId: Models.business = await this.businessBll.getOneByCondition(whereCondition, 'getBusiness');

                if (getBusinessId.owner != givenUserID) {
                    Utils.logger('can edit accessRightId');

                    userBusinessRightMapperModel.firstName = reqObj.firstName;
                    userBusinessRightMapperModel.lastName = reqObj.lastName;
                    userBusinessRightMapperModel.accessRightID = reqObj.accessRightID;
                } else {
                    Utils.logger('cant edit accessRightId');

                    userBusinessRightMapperModel.firstName = reqObj.firstName;
                    userBusinessRightMapperModel.lastName = reqObj.lastName;
                }

                whereCondition = new Object();
                whereCondition.userID = givenUserID;
                updateUserMapperModel = this.userBusinessRightMapperBll.updateByCondition(userBusinessRightMapperModel, whereCondition, 'update userMapper');
                Utils.logger('return after update ', updateUserMapperModel[0]);

                Utils.logger('saved user in user right mapper entity !!');

                responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_USER_SUCCESSFULLY, userBusinessRightMapperModel, MessageConstant.SUCCESS_CODE);
            } else {
                Utils.logger('Not a valid user !!!');
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            }
        } catch (err) {
            Utils.logger('Error log from userFacade !', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('userFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async activateUser(reqMessage: RequestMessage) {
        let resMessage: ResponseMessage = new ResponseMessage();
        try {
            let decodedTokenModel: TokenModel = new TokenModel();
            decodedTokenModel.token = reqMessage.token;
            decodedTokenModel = await this.authentication.decodeToken(decodedTokenModel);
            Utils.logger('Token Data', decodedTokenModel);

            let sessionModel: Models.session = new Models.session(); // await this.sessionBll.getSessionDetails(reqMessage.token);
            Utils.logger("sessionModel: ", sessionModel);
            if (sessionModel != null && decodedTokenModel != null) {
                let userID: string = reqMessage.requestObj.userID;
                let businessID: number = reqMessage.businessID;

                let result: boolean = await this.userBusinessRightMapperBll.activateUser(userID, businessID);
                if (result) {
                    resMessage = this.getResponseMessBuilder(MessageConstant.USER_ACTIVATE_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE);
                } else {
                    resMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_ACTIVATE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            } else {
                resMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.INVALID_TOKEN_CODE);
            }
        } catch (err) {
            Utils.logger("user facade get user list Error: ", err);
            resMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_ACTIVATE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('userFacade', reqMessage.requestObj, err);
        }
        return resMessage;
    }

    async inActivateUser(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            // await this.sessionBll.getSessionDetails(reqMessage.token);
            let decodedTokenModel: TokenModel = new TokenModel();
            decodedTokenModel.token = reqMessage.token;
            decodedTokenModel = await this.authentication.decodeToken(decodedTokenModel);
            Utils.logger('Token Data', decodedTokenModel);

            let sessionModel: Models.session = new Models.session(); // await this.sessionBll.getSessionDetails(reqMessage.token);
            //Utils.logger("sessionModel: ", sessionModel);
            if (sessionModel != null && decodedTokenModel != null) {
                let userID: string = reqMessage.requestObj.userID;
                let businessID: number = reqMessage.businessID;

                // check is Business Owner
                // (d) Get and set Business Owner.
                whereCondition = new Object();
                whereCondition.businessID = businessID;
                let businessModel: Models.business = await this.businessBll.getOneByCondition(whereCondition, 'get business');
                if (businessModel != null) {
                    if (businessModel.owner == userID) {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.ONLY_OWNER_CAN_INACTIVE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                    } else {
                        let result: boolean = await this.userBusinessRightMapperBll.InactivateUser(userID, businessID);
                        if (result) {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.INACTIVATE_USER_SUCCESSFULLY, reqMessage.requestObj, MessageConstant.SUCCESS_CODE);
                        } else {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_INACTIVATE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                        }
                    }
                }

            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.INVALID_TOKEN_CODE);
            }
        } catch (err) {
            Utils.logger("user facade get user list Error: ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_INACTIVATE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('userFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}