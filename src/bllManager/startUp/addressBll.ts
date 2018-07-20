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
export default class AddressBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.address);
    }

    /*async saveAddress(addressModel: AddressModel) {
        let result;
        Util.logger('saveAddress method from userBll');
        try {
            result = await this.dao.save(addressModel);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }*/

 /*   public async getAllAddress() {
        let result;
        Util.logger('getAllAddress method from userBll');
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async updateAddress(model: object, whereCondition: object): Promise<any> {
        let result;
        Util.logger('updateAddress method from userBll');
        try {
            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async deleteAddress(id: string) {
        let result, whereCondition = this.customObject;
        Util.logger('deleteAddress method from userBll');
        try {
            whereCondition.addressID = id;
            result = await this.dao.deleteByCondition(whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async findOne(id: number) {
        let result, whereCondition = this.customObject;
        Util.logger('Find one row method from userBll');
        try {
            whereCondition.addressID = id;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async findAllById(id: number) {
        Util.logger('Find one row method from userBll');
        let result, whereCondition = this.customObject;
        try {
            whereCondition.businessID = id;
            result = await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async getFiltered(whereClause: object) {
        let result;
        Util.logger('Find  row method from userBll');
        try {
            result = await this.dao.getAllByCondition(whereClause);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }
*/
}