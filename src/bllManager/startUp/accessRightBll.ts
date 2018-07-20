/**
 *Created By: jafar Ulla
 *Created Date: 10/6/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */


import Dao from '../../dataAccess/dao';
import * as Entities from "../../entities/startUp/index"
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class AccessRightBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.accessRight);
    }

    /* public async saveAccessRight(accessRightModel: Models.accessRight) {
         let result;
         Utils.logger('saveAccessRight method from accessRightBll');
         try {
             result = await this.dao.save(accessRightModel);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async getAllAccessRight() {
         let result;
         Utils.logger('getAll Access Right method from accessRightBll');
         try {
             result = await this.dao.getAll();
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async updateAccessRight(model: object, whereCondition: object) {
         let result;
         Utils.logger('update AccessRight method from accessRightBll');
         try {
             result = await this.dao.updateByCondition(model, whereCondition);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async findOne(id: number) {
         let result, whereCondition = this.customObject;
         Utils.logger('Find one row method from accessRightBll');
         try {
             whereCondition.accessRightID = id;
             result = await this.dao.getOneByCondition(whereCondition);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }*/

}