/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/24/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import {Inject} from "typescript-ioc";
import * as BLL from "../../bllManager/startUp";
import * as Models from "../../models/startUp";
import ResponseMessage from "../../core/responseMessage";
import RequestMessage from "../../core/requestMessage";
import Utils from "../../utils/utils";
import {Status} from "../../core/enum/enums";
import BaseFacade from "../../core/abstractClass/baseFacade";
import {MessageConstant} from "../../core/messageConstant";

export default class PrivilegeMappingFacade extends BaseFacade {
    @Inject
    privilegeServiceMappingBll: BLL.privilegeMapping;

    constructor() {
        super();
    }

    public async savePrivilegeServiceMapping(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        let privilegeServiceMappingModel: Models.privilegeMapping = <Models.privilegeMapping>reqMessage.requestObj,
            privilegeServiceMappingId: number = privilegeServiceMappingModel.privilegeServiceMappingID;
        privilegeServiceMappingModel.status = Status.Active;
        try {

            if (this.lodash.isNumber(privilegeServiceMappingId) && privilegeServiceMappingId == 0) {
                //save
                Utils.logger('save privilege service mapping');
                delete privilegeServiceMappingModel.privilegeServiceMappingID;

                let result = await this.privilegeServiceMappingBll.save(privilegeServiceMappingModel, 'save privilegeServiceMapping model');

                responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_PRIVILEGE_SERVICE_MAPPING_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

            } else {
                //update
                Utils.logger('update privilege service mapping');
                if (this.lodash.isNumber(privilegeServiceMappingId) && privilegeServiceMappingId > 0) {
                    whereCondition = new Object();
                    whereCondition.privilegeServiceMappingID = privilegeServiceMappingModel.privilegeServiceMappingID;

                    let result = await this.privilegeServiceMappingBll.updateByCondition(privilegeServiceMappingModel, whereCondition, 'update privilegeServiceMappingModel');

                    if (this.lodash.isArray(result)) {
                        if (result[0] > 0) {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_PRIVILEGE_SERVICE_MAPPING_SUCCESSFULLY, privilegeServiceMappingModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                        } else {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CHANGE_FOUND_IN_UPDATE, privilegeServiceMappingModel, MessageConstant.NO_CONTENT_CODE, null, reqMessage.businessID);
                        }
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_PRIVILEGE_SERVICE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                    /*if (result != null && result.length > 0 && result[0] > 0) {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_PRIVILEGE_SERVICE_MAPPING_SUCCESSFULLY, privilegeServiceMappingModel, MessageConstant.SUCCESS_CODE);
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_PRIVILEGE_SERVICE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                    }*/
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, privilegeServiceMappingModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }
            }
        } catch (err) {
            Utils.logger('PrivilegeMappingFacade  savePrivilegeServiceMapping  Error  ', err);
            if (privilegeServiceMappingId == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_PRIVILEGE_SERVICE_MAPPING, reqMessage.requestObj, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_PRIVILEGE_SERVICE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('privilegeMappingFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getAllPrivilegeServiceMapping(reqMessage: RequestMessage) {
        let results = null;
        let responseMessage: ResponseMessage = null;
        try {
            results = await this.privilegeServiceMappingBll.getAll();
            if (results) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_PRIVILEGE_SERVICE_MAPPING_SUCCESSFULLY, results, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ALL_PRIVILEGE_SERVICE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('PrivilegeMappingFacade  getAllPrivilegeServiceMapping  Error ', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ALL_PRIVILEGE_SERVICE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('privilegeMappingFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}