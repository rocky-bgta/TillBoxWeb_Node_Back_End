/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/23/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class PrivilegeRoleMapping extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.rolePrivilegeMapping);
    }

/*    public async getAllByRoleID(roleID: number) {
        try {
            let whereCondition = {roleID: roleID};
            return await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Utils.logger('PrivilegeRoleMapping service   ==/   get   Error :: ', err);
            throw err;
        }
    }

    public async add(model: Models.rolePrivilegeMapping) {
        try {
            return await this.dao.save(model);
        } catch (err) {
            Utils.logger('PrivilegeRoleMapping service   ==/   add   Error :: ', err);
            throw err;
        }
    }

    public async update(model: Models.rolePrivilegeMapping) {
        try {
            let whereCondition = {
                rolePrivilegeMappingID: model.rolePrivilegeMappingID
            };
            return await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Utils.logger('PrivilegeRoleMapping service   ==/   update   Error :: ', err);
            throw err;
        }
    }

    public async removeByRoleID(roleID: number) {
        try {
             let whereCondition = this.customObject;
             whereCondition.roleID = roleID;
            return await this.dao.deleteByCondition(whereCondition);
        } catch (err) {
            Utils.logger('PrivilegeRoleMapping service   ==/   removeByID   Error :: ', err);
            throw err;
        }
    }*/
}