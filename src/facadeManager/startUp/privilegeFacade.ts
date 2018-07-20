/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/23/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import {Inject} from "typescript-ioc";
import * as BLLs from "../../bllManager/startUp";
import RequestMessage from "../../core/requestMessage";
import Utils from "../../utils/utils";
import ResponseMessage from "../../core/responseMessage";
import {MessageConstant} from "../../core/messageConstant";
import {Status} from "../../core/enum/enums";
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as Models from "../../models/startUp"

export default class PrivilegeFacade extends BaseFacade {

    constructor() {
        super();
    }

    @Inject
    privilegeBll: BLLs.privilege;

    public async getPrivilegeList(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        try {
            result = await this.privilegeBll.getAll('getAll privilegeList');
            if (result) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.GET_PRIVILEGE_LIST_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_PRIVILEGE_LIST, null, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_PRIVILEGE_LIST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('privilegeFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async addPrivilege(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        let privilegeModel: Models.privilege = <Models.privilege>reqMessage.requestObj;
        let privilegeId: number = privilegeModel.privilegeID;
        try {
            privilegeModel.status = Status.Active;
            if (privilegeModel.parentID != null && privilegeModel.parentID >= 0) {
                if (this.lodash.isNumber(privilegeId) && privilegeId == 0) {
                    //save
                    delete privilegeModel.privilegeID;
                    privilegeModel = await this.privilegeBll.save(privilegeModel, 'save privilege model');
                    if (privilegeModel != null) {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_PRIVILEGE_SUCCESSFULLY, privilegeModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_PRIVILEGE, privilegeModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    //update
                    if (this.lodash.isNumber(privilegeId) && privilegeId > 0) {
                        whereCondition = new Object();
                        whereCondition.privilegeID = privilegeId;

                        let result = await this.privilegeBll.updateByCondition(privilegeModel, whereCondition, 'update privilege model');

                        if (this.lodash.isArray(result)) {
                            if (result[0] > 0) {
                                responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_PRIVILEGE_SUCCESSFULLY, privilegeModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                            } else {
                                responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CHANGE_FOUND_IN_UPDATE, privilegeModel, MessageConstant.NO_CONTENT_CODE, null, reqMessage.businessID);
                            }
                        } else {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_PRIVILEGE, privilegeModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        }

                        /*if (result != null && result > 0 && result[0] > 0) {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_PRIVILEGE_SUCCESSFULLY, privilegeModel, MessageConstant.SUCCESS_CODE);
                        } else {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_PRIVILEGE, privilegeModel, MessageConstant.FAILED_ERROR_CODE);
                        }*/
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, privilegeModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    }
                }
            } else {
                Utils.logger("PrivilegeFacade  ::  addPrivilege partial content  :: ", privilegeModel);
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, privilegeModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }
        } catch (err) {
            Utils.logger("PrivilegeFacade  ::  addPrivilege Error  :: ", err);
            if (privilegeId == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_PRIVILEGE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_PRIVILEGE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('privilegeFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}