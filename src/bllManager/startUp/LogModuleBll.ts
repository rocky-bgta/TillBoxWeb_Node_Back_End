/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/17/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
//import Utils from "../../utils/utils";
import {Singleton} from "typescript-ioc";

@Singleton
export default class LogModuleBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.logModule);
    }

   /* public async getAllModules() {
        return await this.dao.getAll();
    }

    public async getModule(moduleID: number) {
        let result, whereCondition = this.customObject;
        try {
            whereCondition.moduleID = moduleID;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger('Error ', err);
        }
        return result;
    }*/
}