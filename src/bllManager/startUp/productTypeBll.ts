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
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";

@Singleton
export default class ProductBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.productType);
    }

    /*public async getProductTypes() {
        let result;
        Utils.logger('getProductTypes from productBll ');
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Util.logger("bllProduct get product types Error: ", err.message);
            throw err;
        }
        return result;
    }*/
}