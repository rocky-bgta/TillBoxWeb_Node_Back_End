/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/4/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/

import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";

@Singleton
export default class GstSettingsBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.gstSettings);
    }

 /*   public async getSettings(businessID: number) {
        let result: any = null;
        try {
            let whereCondition = this.customObject;
            whereCondition.businessID = businessID;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Util.logger("gstSettingsBll  getSettings  Error", err);
            throw err;
        }
        return result;
    }

    public async updateSettings(gstSettingModel: GstSettingsModel) {
        let whereCondition = this.customObject;
        let result: any = null;
        try {
            whereCondition = new Object();
            whereCondition.userID = gstSettingModel.userID;
            whereCondition.businessID = gstSettingModel.businessID;

            result = await this.dao.updateByCondition(gstSettingModel, whereCondition);

        } catch (err) {
            Util.logger("gstSettingsBll update settings Error : ", err.message);
            throw err;
        }
        return result;
    }

    public async addGstSettings(gstSettingModel: GstSettingsModel) {
        let result;
        Util.logger('get setting userBll add GST');
        try {
            result = await this.dao.save(gstSettingModel);
        } catch (err) {
            Util.logger("gstSettingsBll  addGstSettings Error ", err);
            throw err;
        }
        return result;
    }*/
}