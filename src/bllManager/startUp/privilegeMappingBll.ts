/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/24/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";

@Singleton
export default class PrivilegeMappingBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.privilegeMapping);
    }

/*    public async addMapping(model: Models.privilegeMapping) {
        let result;
        try {
            model.status = Status.Active;
            result = await this.dao.save(model);
        } catch (err) {
            Utils.logger('privilege service mapping Bll   ::   addMapping()   Error :: ', err);
            throw err;
        }
        return result;
    }

    public async updateMapping(model: Models.privilegeMapping, whereCondition: object) {
        let result;
        try {
            model.status = Status.Active;
            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Utils.logger('privilege service mapping Bll   ::   updateMapping()   Error :: ', err);
            throw err;
        }
        return result;
    }

    public async getAllMapping() {
        let result;
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Utils.logger('privilege service mapping Bll   ::   getAllMapping()   Error :: ', err);
            throw err;
        }
        return result;
    }*/
}