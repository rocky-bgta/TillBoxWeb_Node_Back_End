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
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";

@Singleton
export default class LogTypeBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.logType);
    }

    /*public async getAllLogType() {
        return await this.dao.getAll();
    }

    public async getLogType(logTypeID: number) {
        let result;
        let whereCondition = this.customObject;
        whereCondition.logTypeID=logTypeID;

        result= await this.dao.getOneByCondition(whereCondition);
        return result;
    }*/
}