/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/6/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 isValidInvitationToken token */

import Util from '../../utils/utils';
import Dao from '../../dataAccess/dao';
import BaseBll from "../../core/abstractClass/baseBll";
import * as Enum from "../../core/enum/enums"
import * as Entities from "../../entities/startUp/index";
import {Singleton} from "typescript-ioc";

@Singleton
export default class BusinessDetailsBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.businessDetails);
    }

 /*   async saveBusinessDetails(businessDetailsModel: BusinessDetailsModel) {
        let result;
        Util.logger('saveBusinessDetails method from userBll');
        try {
            result = await this.dao.save(businessDetailsModel);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async getAllBusinessDetails() {
        let result;
        Util.logger('getAllBusinessDetails method from userBll');
        try {
            result = await this.dao.getAll();
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async updateBusinessDetails(model: object, whereCondition: object): Promise<any> {
        let result;
        Util.logger('updateBusinessDetails method from userBll');
        try {
            //this.businessDetailsModel = await this.dao.update(id, businessDetailsModel);
            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async deleteBusinessDetails(id: string) {
        let result, whereCondition = this.customObject;
        Util.logger('deleteBusinessDetails method from userBll');
        try {
            whereCondition.businessDetailsID = id;
            result = await this.dao.deleteByCondition(whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }


    public async findOne(columnName: string, id: number) {
        Util.logger('Find one row method from userBll');
        let result, whereCondition = this.customObject;
        try {
            whereCondition.businessID = id;
            result = await this.dao.getOneByCondition(whereCondition)
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }*/

    public async VMgetBusinessDetails() {
        let queryBuilder = this.getRawQueryBuilder();
        let query: string;
        let result: any;

        query = queryBuilder.table('BusinessDetailsEntity as BD').innerJoin('BusinessContactEntity as BC', 'BD.businessID', '=', 'BC.businessID').innerJoin('AddressEntity as AE', 'AE.businessID', '=', 'BD.businessID')
            .select('BD.tradingName', 'BC.email')
            .where('BD.businessID', 4).toString();

        try {
            result = await this.dao.executeRawQuery(query, Enum.QueryType.Select);
            if (result != null) {
                Util.logger('Raw query result', result);
            }
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;

    }
}