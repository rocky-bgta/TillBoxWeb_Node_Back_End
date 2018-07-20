/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/13/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";

@Singleton
export default class PrivilegeBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.privilege);
    }

   /* public async getPrivilegeList() {
        let result;
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Utils.logger('Error log ', err);
            throw err;
        }
        return result;
    }

    public async savePrivilege(model: Models.privilege) {
        let result;
        try {
            result = await this.dao.save(model);
        } catch (err) {
            Utils.logger("PrivilegeBll   ::   addPrivilege Error ::  ", err);
            throw err;
        }
        return result;
    }

    public async updatePrivilege(model: Models.privilege) {
        let result;
        try {
            let whereCondition = {privilegeID: model.privilegeID};
            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Utils.logger("PrivilegeBll   ::   updatePrivilege Error ::  ", err);
            throw err;
        }
        return result;
    }*/
}