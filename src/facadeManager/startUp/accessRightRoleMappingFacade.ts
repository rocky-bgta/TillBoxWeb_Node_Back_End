/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/25/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as Models from '../../models/startUp';
import * as BLL from "../../bllManager/startUp"
import RequestMessage from "../../core/requestMessage";
import {Inject} from "typescript-ioc";
import ResponseMessage from "../../core/responseMessage";
import {MessageConstant} from "../../core/messageConstant";
import Utils from "../../utils/utils";
import * as _ from 'lodash';

export default class AccessRightRoleMappingFacade extends BaseFacade {

    @Inject
    accessRightRoleMappingBll: BLL.accessRightRoleMapping;
    @Inject
    roleBll: BLL.role;

    constructor() {
        super();
    }

    async saveOrUpdate(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, result = null;

        let VMaccessRightRoleMapping: Models.VMaccessRightRoleMapping,
            accessRightRoleMappingID: number = null,
            accessRightID: number = null,
            accessRightRoleMappingModel: Models.accessRightRoleMapping = null,
            roleModels: Models.role[] = null;

        try {
            VMaccessRightRoleMapping = reqMessage.requestObj;
            accessRightRoleMappingID = _.toNumber(VMaccessRightRoleMapping.accessRightRoleMappingID);
            accessRightID = _.toNumber(VMaccessRightRoleMapping.accessRightID);
            roleModels = VMaccessRightRoleMapping.rolesList;

            if (_.isNaN(accessRightID) || accessRightID == 0) {
                //save
                let model;

                for (let index in roleModels) {
                    accessRightRoleMappingModel = new Models.accessRightRoleMapping();
                    accessRightRoleMappingModel.accessRightID = accessRightID;
                    accessRightRoleMappingModel.roleID = roleModels[index].roleID;
                    model = accessRightRoleMappingModel;
                    await this.accessRightRoleMappingBll.save(model, 'save AccessRightRoleMapping');
                }

                result = VMaccessRightRoleMapping;
                responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_ACCESS_RIGHT_ROLE_MAPPING_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

            } else {
                // update
                let deleteCondition = this.customObject, deleteResult;
                deleteCondition.accessRightID = accessRightID;
                deleteResult = await this.accessRightRoleMappingBll.deleteByCondition(deleteCondition);

                if (deleteResult != null) {
                    let model;

                    for (let index in roleModels) {
                        accessRightRoleMappingModel = new Models.accessRightRoleMapping();
                        accessRightRoleMappingModel.accessRightID = accessRightID;
                        accessRightRoleMappingModel.roleID = roleModels[index].roleID;
                        model = accessRightRoleMappingModel;
                        await this.accessRightRoleMappingBll.save(model, 'save');
                    }
                }

                result = VMaccessRightRoleMapping;
                responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_ACCESS_RIGHT_ROLE_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            }

        } catch (err) {
            if (accessRightRoleMappingID == 0) {
                Utils.logger('Error Log', err);
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_ACCESS_RIGHT_ROLE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                Utils.logger('Error Log', err);
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_RIGHT_ROLE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('saveOrUpdate', reqMessage.requestObj, err);
        }

        return responseMessage;
    } 

    async getAllaccessRightRoleMapping(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, result = null, roleModel: Models.role = null;
        let whereCondition = this.customObject;
        let accessRightID: number = null;
        let accessRightRoleMappingModels: Models.accessRightRoleMapping[];
        let VMaccessRightRoleMapping: Models.VMaccessRightRoleMapping =
            new Models.VMaccessRightRoleMapping();

        let customRolesModel = this.customObject;
        let rolesModelArray = new Array<any>();

        try {
            accessRightID = _.toNumber(reqMessage.requestObj.accessRightID);

            whereCondition = new Object();
            whereCondition.accessRightID = accessRightID;
            accessRightRoleMappingModels = await this.accessRightRoleMappingBll.getAllByCondition(whereCondition, 'get accessRightRoll mapping model');

            for (let index in accessRightRoleMappingModels) {

                whereCondition = new Object();
                whereCondition.roleID = accessRightRoleMappingModels[index].roleID;

                roleModel = await this.roleBll.getOneByCondition(whereCondition, 'role model');

                customRolesModel = new Object();
                customRolesModel.roleID = accessRightRoleMappingModels[index].roleID;
                customRolesModel.name = roleModel.name;
                customRolesModel.description = roleModel.description;
                rolesModelArray.push(customRolesModel);
            }

            VMaccessRightRoleMapping.accessRightID = accessRightID;
            VMaccessRightRoleMapping.rolesList = rolesModelArray;
            delete VMaccessRightRoleMapping.accessRightRoleMappingID;
            result = VMaccessRightRoleMapping;

            responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_ACCESS_RIGHT_ROLE_MAPPING, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ACCESS_RIGHT_ROLE_MAPPING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getAllaccessRightRoleMapping', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}