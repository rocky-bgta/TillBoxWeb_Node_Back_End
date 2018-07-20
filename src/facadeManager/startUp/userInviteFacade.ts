/**
 *Author: Ayasha Siddiqua
 *Date: 10/5/17
 *Time: 4:40 PM
 */
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import Util from "../../utils/utils";
import {MessageConstant} from "../../core/messageConstant";
import * as  Enums from "../../core/enum/enums"
import MailSender from "../../utils/mailSender";
import SessionModel from "../../models/startUp/sessionModel";
import UserInvitationModel from "../../models/startUp/userInvitationModel";

import * as BLL from "../../bllManager/startUp";
import * as Models from "../../models/startUp";
import BaseFacade from "../../core/abstractClass/baseFacade";


export default class UserInviteFacade extends BaseFacade {
    //@Inject
    businessBll: BLL.business = new BLL.business();

    //@Inject
    userBll: BLL.user = new BLL.user();

    //@Inject
    sessionBll: BLL.session = new BLL.session();

    //@Inject
    userInvitationTokenBll: BLL.userInvitationToken = new BLL.userInvitationToken();

    // @Inject
    userBusinessRightMapperBll: BLL.userBusinessRightMapper = new BLL.userBusinessRightMapper();

    //@Inject
    userBusinessRightMapperModel: Models.userBusinessRightMapper = new Models.userBusinessRightMapper();

    //@Inject
    userModel: Models.user = new Models.user();

    //@Inject
    userInvitationModel: Models.userInvitation = new Models.userInvitation();

    //@Inject
    userInviteBll: BLL.userInvite = new BLL.userInvite();

    constructor() {
        super();
    }

    async inviteUser(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let givenUserId, reqObj, businessId, whereCondition = this.customObject;
        let responseMessage: ResponseMessage;
        reqObj = reqMessage.requestObj;
        givenUserId = reqObj.userID;
        businessId = reqMessage.businessID;
        try {
            let isValidUserWithBusinessId;
            whereCondition = new Object();
            whereCondition.userID = givenUserId;
            whereCondition.businessID = businessId;
            isValidUserWithBusinessId = await this.userBusinessRightMapperBll.getOneByCondition(whereCondition, 'isValidBusinessWithUserID');

            if (isValidUserWithBusinessId != null) {
                Util.logger('This user already exist !! Failed to invite this user !!');
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SEND_USER_INVITE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                //Check whether a valid businessID or not
                let isValidBusinessId;
                whereCondition = new Object();
                whereCondition.businessID = businessId;
                isValidBusinessId = await this.businessBll.getOneByCondition(whereCondition, 'isValidBusinessId');

                Util.logger('isValidBusinessId result ', isValidBusinessId);

                if (isValidBusinessId != null) {
                    let createUserToken;
                    //Have to create  a new token
                    createUserToken = await this.userInvitationTokenBll.generateUserInviteToken(reqMessage);

                    if (createUserToken != null) {
                        //send the token to URL
                        let invitationToken;
                        invitationToken = createUserToken.token;
                        let buildUrl;

                        //http://10.200.10.36:7575
                        buildUrl = `http://10.200.10.241:7575/welcome/${invitationToken}`;
                        MailSender.mailSend(createUserToken.userID, 'Mail From TillboxWeb[Invite User]', buildUrl);
                        responseMessage = this.getResponseMessBuilder(MessageConstant.INVITE_USER_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GENERATE_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    Util.logger('Invalid businessId');
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_BUSINESSID, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
            }
        } catch (err) {
            Util.logger('userInviteFacade inviteUser Error', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SEND_USER_INVITE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('userInviteFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async createUserWithBusinessId(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        let reqObj, invitationToken;
        reqObj = reqMessage.requestObj;
        invitationToken = reqObj.token;

        Util.logger('requested object from facade ');
        try {
            //token validation !!
            let isValidToken: Models.userInvitation;

            whereCondition = new Object();
            whereCondition.token = invitationToken;
            isValidToken = await this.userInvitationTokenBll.getOneByCondition(whereCondition, 'isValidToken');

            if (isValidToken != null) {
                let date;
                date = new Date();
                if ((isValidToken.expireDate.getTime() > date.getTime()) && !isValidToken.done) {
                    Util.logger('A valid invitation token request!!');

                    //is Already done(true) with this userID?
                    let tokenStatus;
                    tokenStatus = isValidToken.done;
                    Util.logger('isValidToken Status is :', tokenStatus);

                    //already user of this system?
                    let isAlreadyUser;
                    whereCondition = new Object();
                    whereCondition.userID = isValidToken.userID;
                    isAlreadyUser = await this.userBll.getOneByCondition(whereCondition, 'isAlready user');

                    if (isAlreadyUser != null) {
                        //already a user, so insert it into userRightMapper Entity with new businessID

                        //if already done with this userID?
                        let isAlreadyExist;
                        whereCondition = new Object();
                        whereCondition.userID = isValidToken.userID;
                        whereCondition.businessID = isValidToken.businessID;

                        isAlreadyExist = await this.userBusinessRightMapperBll.getOneByCondition(whereCondition, 'isAlready Exist');
                        Util.logger('checking in the mapper userBll whether or not already exist', isAlreadyExist);

                        if (isAlreadyExist != null) {
                            Util.logger('Already user of this business !! Cant create new business with this userID');
                            responseMessage = this.getResponseMessBuilder(MessageConstant.ALREADY_USER_WITH_BUSINESSID, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        } else {
                            this.userBusinessRightMapperModel.businessID = isValidToken.businessID;
                            this.userBusinessRightMapperModel.userID = isValidToken.userID;
                            this.userBusinessRightMapperModel.lastName = isValidToken.lastName;
                            this.userBusinessRightMapperModel.firstName = isValidToken.firstName;
                            this.userBusinessRightMapperModel.accessRightID = isValidToken.accessRightID;
                            this.userBusinessRightMapperModel.status = Enums.Status.Active;

                            let result;
                            delete this.userBusinessRightMapperModel.userBusinessRightMapperID;
                            result = await this.userBusinessRightMapperBll.save(this.userBusinessRightMapperModel);

                            if (result != null) {
                                //Add user in the userRightMapper
                                whereCondition = new Object();
                                whereCondition.userID = result.userID;
                                whereCondition.businessID = result.businessID;
                                let invitationModels = await this.userInvitationTokenBll.getAllByCondition(whereCondition, 'get all invitationModels');
                                Util.logger("invitation Models ", invitationModels);

                                for (let i = 0; i < invitationModels.length; i++) {
                                    let invitationModel: UserInvitationModel = invitationModels[i];
                                    invitationModel.done = true;
                                    whereCondition = new Object();
                                    whereCondition.token = invitationModel.token;
                                    invitationModel = await this.userInvitationTokenBll.updateByCondition(invitationModel, whereCondition, 'update userInvitationToken');
                                    Util.logger("updated invitationModel ", invitationModel);
                                }
                                Util.logger('updated result of User invitation token entity ', result);
                                responseMessage = this.getResponseMessBuilder(MessageConstant.SUCCESSFULLY_CREATE_BUSINESS, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

                            } else {
                                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_CREATE_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                            }
                        }
                    } else {
                        //Not a user of this system !! So go to registration page
                        isValidToken.accessRightID = 0;
                        responseMessage = this.getResponseMessBuilder(MessageConstant.REDIRECT, isValidToken, MessageConstant.REDIRECT_CODE, isValidToken.token, isValidToken.businessID);
                    }
                } else {
                    Util.logger('Invitation token is expired or already done  !!!');
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_INVITATION_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
            } else {
                Util.logger('Not a valid invitation token  !!!');
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_INVITATION_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger("userInviteFacade create user with businessID get Error : ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_CREATE_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('userInviteFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async removeInvitation(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            whereCondition = new Object();
            whereCondition.token = reqMessage.token;
            let sessionModel: SessionModel = await this.sessionBll.getOneByCondition(whereCondition, 'session details');
            if (sessionModel != null) {
                let userInvitationModel: UserInvitationModel = reqMessage.requestObj;
                whereCondition = new Object();
                whereCondition.token = userInvitationModel.token;
                let count: number = await this.userInvitationTokenBll.deleteByCondition(whereCondition, 'remove invitation');
                if (count != null && count > 0) {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.REMOVE_INVITATION_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_REMOVE_INVITATION, userInvitationModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger("user invitation facade...remove user invitation Error ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('userInviteFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }


    async reInviteUser(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            let isValidToken: Models.userInvitation;
            whereCondition = new Object();
            whereCondition.token = reqMessage.requestObj.token;
            isValidToken = await this.userInvitationTokenBll.getOneByCondition(whereCondition, 'isValidToken');

            if (isValidToken != null) {
                let date;
                date = new Date();

                Util.logger('isValid done status ', isValidToken.done);

                //valid expire date and isValid token is false, isValid token true means already req accepted!

                if ((isValidToken.expireDate.getTime() > date.getTime()) && !isValidToken.done) {
                    Util.logger('A valid reInvitation token request!!');

                    //change the expire date and send the whole invitationModel to updateUserInvitationToken for update the token table
                    let invitationModel: Models.userInvitation = new UserInvitationModel();
                    invitationModel.userID = isValidToken.userID;
                    invitationModel.firstName = isValidToken.firstName;
                    invitationModel.lastName = isValidToken.lastName;
                    invitationModel.businessID = isValidToken.businessID;
                    invitationModel.token = reqMessage.requestObj.token;
                    invitationModel.accessRightID = isValidToken.accessRightID;
                    invitationModel.done = false;
                    invitationModel.status = Enums.Status.Active;

                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    invitationModel.expireDate = date;

                    Util.logger('expire date is ', date);

                    //now update the userInvitation invitationModel
                    let updateUserInvitationToken;
                    updateUserInvitationToken = this.userInvitationTokenBll.updateByCondition(invitationModel, whereCondition, 'update user invitation');

                    Util.logger('updateUserInvitationToken result ', updateUserInvitationToken);

                    /* let userID, firstName, lastName, accessRightID, token, businessId;
                     userID = isValidToken.userID;
                     firstName = isValidToken.firstName;
                     lastName = isValidToken.lastName;
                     accessRightID = isValidToken.accessRightID;
                     token = reqMessage.requestObj.token;

                     //get token's businessId from isValidToken
                     businessId = isValidToken.businessID;

                     let reqObject = {
                         userID: userID,
                         firstName: firstName,
                         lastName: lastName,
                         accessRightID: accessRightID,
                         token: token
                     };

                     reqMessage.requestObj = reqObject;
                     //bind that businessId with reqMessage
                     reqMessage.businessID = businessId;

                     let createUserToken;
                     //Have to create  a new token !!
                     createUserToken = await this.userInvitationTokenBll.generateUserInviteToken(reqMessage);
                     Utils.logger('createUserToken Successfully and save it to Dao !!', createUserToken); */


                    let buildUrl;
                    buildUrl = `http://10.200.10.241:7575/welcome/${isValidToken.token}`;
                    MailSender.mailSend(isValidToken.userID, 'Mail From TillboxWeb[Invite User]', buildUrl);
                    responseMessage = this.getResponseMessBuilder(MessageConstant.REINVITE_USER_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    Util.logger('userinvitefacade token expire or already done');
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_INVITATION_TOKEN, reqMessage.requestObj, MessageConstant.INVALID_TOKEN_CODE, null, reqMessage.businessID);
                }
            } else {
                Util.logger('Not a valid token !!');
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.INVALID_TOKEN_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger('userInviteFacade reInviteUser Error', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_REINVITE_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('userInviteService', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}