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
export default class AccessRightRoleMappingBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.accessRightRoleMapping);
    }

    /* public async saveAccessRightRoleMapping(model: any) {
         let result;
         Utils.logger('saveAccessRightMappingBll method from accessRightBll');
         try {
             result = await this.dao.save(model);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async getAllAccessRightRoleMapping(reqMessage: RequestMessage) {
         let result;
         Utils.logger('get All AccessRightMappingBll method from accessRightBll');
         try {
             result = await this.dao.getAll();
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async getAllByCondition(whereCondition: object) {
         let result;
         Utils.logger('get All AccessRightMappingBll method from accessRightBll');
         try {
             result = await this.dao.getAllByCondition(whereCondition);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async updateAccessRightRoleMapping(model: object, whereCondition: object) {
         let result;
         Utils.logger('update AccessRightMappingBll method from accessRightBll');
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
         Utils.logger('Find one row method from AccessRightMappingBll');
         try {
             whereCondition.accessRightRoleMappingID = id;
             result = await this.dao.getOneByCondition(whereCondition);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async deleteByCondition(whereCondition: object) {
         let result;
         Utils.logger('delete ByCondition from Bll');
         try {
             result = await this.dao.deleteByCondition(whereCondition);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }*/
}