/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/10/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class BusinessTypeBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.businessType);
    }

    /*public async getBusinessType() {
        let result;
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Util.logger("BusinessTypeBll get business types Error: ", err);
            throw err;
        }
        return result;
    }*/
}