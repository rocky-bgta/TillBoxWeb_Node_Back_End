/**
 *Author: Ayasha Siddiqua
 *Date: 10/23/17
 *Time: 2:27 PM
 */
import Dao from "../../dataAccess/dao";
import * as Entites from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class RoleBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entites.role);
    }

/*    public async saveRole(model: Models.role) {
        let result;
        Utils.logger('save user role from roleBll ');
        try {
            result = await this.dao.save(model);
        } catch (err) {
            Utils.logger('roleBll : save role model error ', err);
            throw err;
        }
        return result;
    }

    public async updateRole(model: Models.role) {
        Utils.logger('edit role from roleBll ');
        let result;
        try {
            let whereCondition = {roleID: model.roleID};
            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Utils.logger('roleBll : edit role error ', err);
            throw err;
        }
        return result;
    }

    public async getRoleList() {
        let result;
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Utils.logger('roleBll getRoleList Error ', err);
            throw err;
        }

        return result;
    }

    public async getAllByCondition(whereCondition: object) {
        let result;
        try {
            result = await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Utils.logger('roleBll getAllByCondition Error ', err);
            throw err;
        }
        return result;
    }

    public async getOneByCondition(whereCondition: object) {
        let result;
        try {
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger('roleBll getOneByCondition Error', err);
            throw err;
        }
        return result;
    }*/
}