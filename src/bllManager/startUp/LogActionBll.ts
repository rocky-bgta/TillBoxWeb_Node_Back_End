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
export default class LogActionBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.logAction);
    }

    /*public async getAllActionType() {
        return await this.dao.getAll();
    }

    public async getActionType(actionID: number) {
        let result, whereCondition = this.customObject;
        whereCondition.actionID = actionID;
        try {
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger('Error log ', err);
        }
        return result;
    }*/
}