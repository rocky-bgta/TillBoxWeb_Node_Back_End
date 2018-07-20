/**
 *Author: Ayasha Siddiqua
 *Date: 10/23/17
 *Time: 2:01 PM
 */
import BaseFacade from "../../core/abstractClass/baseFacade";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import Utils from "../../utils/utils";
import {MessageConstant} from "../../core/messageConstant";
import {Inject} from "typescript-ioc";
import * as BLL from "../../bllManager/startUp";
import RoleModel from "../../models/startUp/roleModel";
import {Status} from "../../core/enum/enums";
import * as Model from "../../models/startUp";

export default class RoleFacade extends BaseFacade {

    @Inject
    roleBll: BLL.role;

    @Inject
    businessBll: BLL.business;

    constructor() {
        super();
    }

    public async addRole(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        let result = null;
        let roleModel: RoleModel = <Model.role>reqMessage.requestObj;
        let roleId: number = roleModel.roleID;
        roleModel.status = Status.Active;

        try {
            let isValidBusinessId = await this.businessBll.isValidBusinessID(reqMessage.businessID);
            Utils.logger('isValidBusinessId result ', isValidBusinessId);
            if (isValidBusinessId) {
                if (this.lodash.isNumber(roleId) && roleId == 0) {
                    //save
                    delete roleModel.roleID;
                    result = await this.roleBll.save(roleModel, 'save role');
                    if (result != null) {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_ROLE_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_ROLE, roleModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    //update
                    if (this.lodash.isNumber(roleId) && roleId > 0) {
                        whereCondition = new Object();
                        whereCondition.roleID = roleId;
                        result = await this.roleBll.updateByCondition(roleModel, whereCondition, 'update roleModel');

                        if (this.lodash.isArray(result)) {
                            if (result[0] > 0) {
                                responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_ROLE_SUCCESSFULLY, roleModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                            } else {
                                responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CHANGE_FOUND_IN_UPDATE, reqMessage.requestObj, MessageConstant.NO_CONTENT_CODE, null, reqMessage.businessID);
                            }
                        } else {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_ROLE, roleModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        }
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, roleModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_BUSINESSID, roleModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

        } catch (err) {
            Utils.logger('role facade Error', err);

            if (roleId == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_ROLE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_ROLE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('roleFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getRoleList(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        Utils.logger('get user list from role facade ');
        let result = null;
        try {
            result = await this.roleBll.getAll('getAll roleModel');
            if (result) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ROLE_LIST_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ROLE_LIST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }

        } catch (err) {
            Utils.logger('get user list error ', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ROLE_LIST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('roleFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}