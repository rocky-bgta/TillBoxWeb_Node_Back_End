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
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class BasLodgementOptionBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.basLodgementOption);
    }

    /*public async getAllBasLodgementOption() {
        try {
            return await this.dao.getAll();
        } catch (err) {
            Util.logger("BasLodgementOption getAll Error: ", err.message);
            throw err;
        }
    }*/
}