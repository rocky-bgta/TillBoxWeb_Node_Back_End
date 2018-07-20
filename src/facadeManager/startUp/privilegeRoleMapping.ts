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
import * as Models from "../../models/startUp";
import * as Enums from "../../core/enum/enums";
import BaseFacade from "../../core/abstractClass/baseFacade";

export default class PrivilegeRoleMapping extends BaseFacade {

    constructor() {
        super();
    }

    @Inject
    rolMappingService: BLLs.privilegeRoleMapping;

    public async savePrivilegeRole(reqMessage: RequestMessage) {
        let resMessage = new ResponseMessage(), whereCondition = this.customObject;
        try {
            let vmRolePrivilegeMappingModel: Models.VMRolePrivilegeMapping = reqMessage.requestObj;
            //if (vmRolePrivilegeMappingModel.roleID != null && vmRolePrivilegeMappingModel.roleID > 0) {
            if (this.lodash.isNumber(vmRolePrivilegeMappingModel.roleID) && vmRolePrivilegeMappingModel.roleID > 0) {
                let responseVM = new Models.VMRolePrivilegeMapping();
                responseVM.roleID = vmRolePrivilegeMappingModel.roleID;

                whereCondition = new Object();
                whereCondition.roleID = vmRolePrivilegeMappingModel.roleID;
                let count = this.rolMappingService.deleteByCondition(whereCondition, 'delete mapping');
                Utils.logger('deleted mapping  ', count);

                Utils.logger('vmRolePrivilegeMappingModel    ', vmRolePrivilegeMappingModel);

                for (let i = 0; i < vmRolePrivilegeMappingModel.privilegeList.length; i++) {
                    Utils.logger('for i  ::  ', i);
                    let rolePrivilegeMappingModel: Models.rolePrivilegeMapping = vmRolePrivilegeMappingModel.privilegeList[i];
                    Utils.logger('for i ' + i + ' model    ', rolePrivilegeMappingModel);
                    rolePrivilegeMappingModel.status = Enums.Status.Active;
                    rolePrivilegeMappingModel.roleID = vmRolePrivilegeMappingModel.roleID;
                    Utils.logger('rolePrivilegeMapping to save    ', rolePrivilegeMappingModel);
                    try {
                        delete rolePrivilegeMappingModel.rolePrivilegeMappingID
                        rolePrivilegeMappingModel = await this.rolMappingService.save(rolePrivilegeMappingModel, 'save rolePrivilegeMappingModel');
                        if (rolePrivilegeMappingModel != null) {
                            responseVM.privilegeList.push(rolePrivilegeMappingModel);
                        }
                    } catch (err) {
                        Utils.logger('failed to save rolePrivilegeMapping  Error for ::  ', rolePrivilegeMappingModel);
                        Utils.logger('failed to save rolePrivilegeMapping  Error message ::  ', err);
                    }
                    /*if (model.rolePrivilegeMappingID != null && model.rolePrivilegeMappingID > 0) {
                        Utils.logger('PrivilegeFacade Role Mapping   updatePrivilegeRole  :: ', model);
                        let result = await this.r;olMappingService.update(model);
                        if (result != null && result > 0) {
                            responseVM.privilegeList.push(model);
                        }
                    }
                    else {
                        Utils.logger('PrivilegeFacade Role Mapping   savePrivilegeRole  :: ', model);
                        model = await this.rolMappingService.add(model);
                        if (model != null) {
                            responseVM.privilegeList.push(model);
                        }
                    }*/
                }
                resMessage = this.getResponseMessBuilder(MessageConstant.SAVE_PRIVILEGE_ROLE_SUCCESSFULLY, responseVM, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                resMessage = this.getResponseMessBuilder(MessageConstant.ROLE_ID_REQUIRED, vmRolePrivilegeMappingModel, MessageConstant.PARTIAL_CONTENT_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('PrivilegeFacade Role Mapping   savePrivilegeRole   Error :: ', err);
            resMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_PRIVILEGE_ROLE, reqMessage, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('privilegeRoleMapping', reqMessage, err)
        }
        return resMessage;
    }

    public async getAllRoleMapping(reqMessage: RequestMessage) {
        let resMessage = new ResponseMessage(), whereCondition = this.customObject;
        try {
            let vmRolePrivilegeModel: Models.VMRolePrivilegeMapping = reqMessage.requestObj;

            whereCondition = new Object();
            whereCondition.roleID = vmRolePrivilegeModel.roleID;

            let results = await this.rolMappingService.getAllByCondition(whereCondition, 'getAllRoleMapping');
            vmRolePrivilegeModel.privilegeList = results;
            resMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_ROLE_MAPPING, vmRolePrivilegeModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('PrivilegeFacade Role Mapping   getAllPrivilegeRole   Error :: ', err);
            resMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ALL_ROLE_MAPPING, reqMessage, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('privilegeRoleMapping', reqMessage, err);
        }
        return resMessage;
    }

    public async getAllMapping(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let whereCondition = this.customObject;
        try {
            let rolePrivilegeModels = new Array<Models.VMRolePrivilegeMapping>();
            let roleService = new BLLs.role();
            let roleModels = await roleService.getAll('getAll role');

            for (let i = 0; i < roleModels.length; i++) {
                let roleModel = roleModels[i];

                whereCondition = new Object();
                whereCondition.roleID = roleModel.roleID;

                let model = await this.rolMappingService.getAllByCondition(whereCondition, 'get roleMappingService');
                if (model != null && model.length > 0) {
                    let roleMappingModel = new Models.VMRolePrivilegeMapping();
                    roleMappingModel.roleID = roleModel.roleID;
                    roleMappingModel.privilegeList = model;
                    rolePrivilegeModels.push(roleMappingModel);
                }
            }
            responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_MAPPING, rolePrivilegeModels, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('PrivilegeFacade Role Mapping   getAllMapping   Error :: ', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ALL_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('privilegeRoleMapping', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}