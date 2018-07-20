/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/6/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";

@Singleton
export default class GstOptionBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.gstOption);
    }

   /* public async getGstOptions() {
        let result;
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Utils.logger("GstOption getAll Error: ", err.message);
            throw err;
        }
        return result;
    }*/
}