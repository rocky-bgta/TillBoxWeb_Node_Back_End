import {Inject} from "typescript-ioc";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import {MessageConstant} from "../../core/messageConstant";
import Utils from "../../utils/utils";
import * as Enum from "../../core/enum/enums";
//import LogActionModel from "../models/logActionModel";
//import BllLogType from "../bllManager/LogTypeBll";
//import LogTypeModel from "../models/logTypeModel";
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as BLL from "../../bllManager/startUp";
import * as Models from "../../models/startUp";
import * as BLLAccount from "../../bllManager/accounting"

export default class BusinessFacade extends BaseFacade {
    @Inject
    sessionBll: BLL.session;

    @Inject
    userBusinessRightMapperBll: BLL.userBusinessRightMapper;

    @Inject
    businessBll: BLL.business;

    @Inject
    resMessage: ResponseMessage;

    @Inject
    productBll: BLL.product;

    @Inject
    privilegeBll: BLL.privilege;

    @Inject
    businessTypeBll: BLL.businessType;

    @Inject
    userBll: BLL.user;

    @Inject
    accountBll: BLLAccount.account;


    constructor() {
        super();
    }

    public async getAllBusiness(reqMessage: RequestMessage) {
        let whereCondition = this.customObject;
        let responseMessage: ResponseMessage = null;
        try {
            whereCondition = new Object();
            whereCondition.token = reqMessage.token;

            let sessionModel: Models.session = await this.sessionBll.getOneByCondition(whereCondition, 'getSessionDetails');
            if (sessionModel != null) {
                whereCondition = new Object();
                whereCondition.userID = sessionModel.userID;

                let userBusinessRightMapperModels: Models.userBusinessRightMapper[] = await this.userBusinessRightMapperBll.getAllByCondition(whereCondition, 'userBusinessRightMapper model');

                if (userBusinessRightMapperModels != null && userBusinessRightMapperModels.length > 0) {
                    let businessList = new Array<Models.VMbusiness>();
                    for (let i = 0; i < userBusinessRightMapperModels.length; i++) {

                        whereCondition = new Object();
                        whereCondition.businessID = userBusinessRightMapperModels[i].businessID;

                        let businessModel: Models.VMbusiness = await this.businessBll.getOneByCondition(whereCondition, 'get businessModel');

                        if (businessModel != null) {
                            businessModel.status = userBusinessRightMapperModels[i].status;
                            businessModel.accessRightID = userBusinessRightMapperModels[i].accessRightID;
                            businessList.push(businessModel);
                        }
                    }

                    // Audit log work  start
                    /*

                                        let logActionService = new BLL.logAction();
                                        let logActionModel: LogActionModel = await logActionService.getActionType(1);
                                        let logTypeService = new BllLogType();
                                        let logTypeModel: LogTypeModel = await logTypeService.getLogType(1);
                                        let calledFunctionName: string = "business Facade :: getAllBusiness()";
                                        let logMessage: string = "userID = " + clientData.userID + "   businessID = " + bisModel.businessID;

                                        let logMessageService = new BLL.logMessage;
                                        let logMessageModel = await logMessageService.saveLogMessage(clientData.userID, clientData.moduleID, clientData.pageName,
                                            calledFunctionName, logActionModel.actionID, clientData.accessRight, logMessage, false,
                                            logTypeModel.logTypeID, clientData.sessionID);
                    */

                    //  Audit log work finish

                    //Utils.logger("client data ", clientData);
                    //Utils.logger("client data ", logMessageModel);


                    let statusOptions: Array<Models.commonIdValue> = new Array<Models.commonIdValue>();
                    let enumSize: number = Object.keys(Enum.Status).length / 2;
                    for (let i = 1; i <= enumSize; i++) {
                        let model: Models.commonIdValue = new Models.commonIdValue();
                        model.id = i;
                        model.value = Enum.Status[i];
                        statusOptions.push(model);
                    }

                    let responseModel: Models.VMbusinessListResponse = new Models.VMbusinessListResponse();
                    responseModel.businessList = businessList;
                    responseModel.statusOptions = statusOptions;
                    responseModel.privlegeOptions = await this.privilegeBll.getAll('getAll');

                    responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_BUSINESS, responseModel, MessageConstant.SUCCESS_CODE);
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.NO_BUSINESS_FOUND, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE);
            }
        } catch (err) {
            Utils.logger("businessFacade getAllBusiness  Error :  ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('businessFacade', reqMessage, err);
        }
        return responseMessage;
    }

    public async addBusiness(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        let businessModels: Models.business[] = null,
            userBusinessRightMapperModels: Models.userBusinessRightMapper[] = null;
        let isBusinessExist: boolean = false;
        let givenBusinessName: string = null;
        let reqBusinessModel: Models.business = null;
        let sessionModel: Models.session = null;
        let createdBusinessModel: Models.business = null,isCOAcreated:boolean=false;
        let userModel: Models.user = null;

        try {
            reqBusinessModel = reqMessage.requestObj;
            givenBusinessName = reqBusinessModel.businessName;

            whereCondition.token = reqMessage.token;
            sessionModel = await this.sessionBll.getOneByCondition(whereCondition, 'getSession details');


            whereCondition = new Object();
            whereCondition.userID = sessionModel.userID;
            userModel = await this.userBll.getOneByCondition(whereCondition);


            //business list of login user (using userID filter)
            userBusinessRightMapperModels = await this.userBusinessRightMapperBll.getAllByCondition(whereCondition, 'get userBusinessRightMapperModels');

            //get all business id's from userBusinessRightMapperTable

            let businessIDs = this.lodash.map(userBusinessRightMapperModels, 'businessID');

            whereCondition = new Object();
            whereCondition.businessID = businessIDs;

            //get all business rows from business Table by matching ID
            businessModels = await this.businessBll.getAllByCondition(whereCondition);

            for (let businessModel of businessModels) {
                if (businessModel.businessName == givenBusinessName) {
                    isBusinessExist = true;
                    break;
                }
            }

            if (sessionModel != null) {
                if (!isBusinessExist) {

                    createdBusinessModel  = await this.businessBll.createBusiness(userModel,'123456', givenBusinessName);
                    isCOAcreated = await this.accountBll.createCOAByBusinessID(createdBusinessModel.businessID);

                  /*  let dbName = Utils.getDbNameByBusinessName(givenBusinessName);

                    await Utils.createDataBase(sequelize, dbName);

                    reqBusinessModel.subscriptionStatus = 1;
                    reqBusinessModel.status = Enum.Status.Active;
                    delete reqBusinessModel.businessID;
                    reqBusinessModel.businessDBName = dbName;
                    reqBusinessModel.owner = sessionModel.userID;

                    createdBusinessModel = await this.businessBll.saveBusiness(reqBusinessModel, sessionModel.userID);

                    let userBusinessRightMapperModel = new Models.userBusinessRightMapper();
                    userBusinessRightMapperModel.businessID = createdBusinessModel.businessID;
                    userBusinessRightMapperModel.userID = sessionModel.userID; //sessionModel.userID;
                    userBusinessRightMapperModel.accessRightID = Enum.UserAccessRight.Administrator;
                    userBusinessRightMapperModel.createdBy = sessionModel.userID;
                    userBusinessRightMapperModel.updatedBy = sessionModel.userID;
                    await this.userBusinessRightMapperBll.save(userBusinessRightMapperModel, 'add to userBusinessRightMapper');*/

                  if(createdBusinessModel !=null && isCOAcreated)
                      responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_BUSINESS_SUCCESSFULLY, createdBusinessModel, MessageConstant.SUCCESS_CODE,null, reqMessage.businessID);
                  else
                      responseMessage =this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE,null, reqMessage.businessID);

                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.BUSINESS_ALREADY_EXIST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE);
            }
        } catch (err) {
            Utils.logger("businessFacade addBusiness  Error:  ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('businessFacade', reqMessage, err);
        }
        return responseMessage;
    }

    public async getBusinessOption(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        try {
            //let productService = new BllProduct();
            let productTypeModels: Array<Models.productType> = await this.productBll.getAll('getAll productType');

            //let businessTypeService = new BllBusinessType();
            let businessTypeModels: Array<Models.businessType> = await this.businessTypeBll.getAll('getAll businessType');
            let addBusinessOptionModel: Models.addBusinessOpinion = new Models.addBusinessOpinion();
            addBusinessOptionModel.setProductType(productTypeModels);
            addBusinessOptionModel.setBusinessType(businessTypeModels);

            responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_BUSINESS_OPTION_SUCCESSFULLY, addBusinessOptionModel, MessageConstant.SUCCESS_CODE);
        } catch (err) {
            Utils.logger("business facade get business option Error: ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ALL_BUSINESS_OPTION, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('businessFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async selectBusiness(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            whereCondition = new Object();
            whereCondition.token = reqMessage.token;

            let sessionModel: Models.session = await this.sessionBll.getOneByCondition(whereCondition, 'getSessions details');
            if (sessionModel != null) {
                whereCondition = new Object();
                whereCondition.businessID = reqMessage.requestObj.businessID;
                let businessModel: Models.business = await this.businessBll.getOneByCondition(whereCondition, 'get business');
                if (businessModel != null) {
                    whereCondition = new Object();
                    whereCondition.businessID = businessModel.businessID;
                    whereCondition.userID = sessionModel.userID;

                    let userBusinessRightMapperModel: Models.userBusinessRightMapper =
                        await this.userBusinessRightMapperBll.getOneByCondition(whereCondition, 'getAccessRightBusinessID');

                    if (userBusinessRightMapperModel != null) {
                        sessionModel.businessID = businessModel.businessID;
                        sessionModel.businessDBName = businessModel.businessDBName;

                        whereCondition = new Object();
                        whereCondition.sessionID = sessionModel.sessionID;


                        let updateSessionModel = await this.sessionBll.updateSession(sessionModel);

                        if (updateSessionModel != null) {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.BUSINESS_SELECT_SUCCESSFULLY, sessionModel, MessageConstant.SUCCESS_CODE, updateSessionModel.token, updateSessionModel.businessID);

                            //responseMessage = this.getResponseMessBuilder(MessageConstant.BUSINESS_SELECT_SUCCESSFULLY, sessionModel, MessageConstant.SUCCESS_CODE);
                        } else {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                        }
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                    }
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CONTENT, reqMessage.requestObj, MessageConstant.NO_CONTENT_CODE);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE);
            }
        } catch (err) {
            Utils.logger("Business Facade Get Business Option Error: ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SELECT_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('businessFacade', reqMessage, err);
        }
        return responseMessage;
    }
}