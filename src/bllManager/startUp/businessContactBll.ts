/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/6/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */

import Dao from '../../dataAccess/dao';
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class BusinessContactBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.businessContact);
    }

    /*async saveBusinessContact(businessContactModel: BusinessContactModel) {
        let result;
        Util.logger('saveBusinessContact method from userBll');
        try {
            result = await this.dao.save(businessContactModel);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async getAllBusinessContacts() {
        let result;
        Util.logger('getAllBusinessContacts method from userBll');
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async updateBusinessContact(model: object, whereCondition: object): Promise<any> {
        let result;
        Util.logger('updateBusinessContact method from userBll');
        try {
            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

      public async deleteBusinessContact(id: string) {
          Utils.logger('deleteBusinessContact method from userBll');
          try {
              this.businessContactModel = await this.dao.delete(id);
          } catch (err) {
              Utils.logger('Error Log', err);
              throw err;
          }
          return this.businessContactModel;
      }

    public async findOne(columnName: string, id: number): Promise<BusinessContactModel> {
        let result, whereCondition = this.customObject;
        Util.logger('Find one row method from userBll');
        try {
            whereCondition.businessID = id;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }*/
}