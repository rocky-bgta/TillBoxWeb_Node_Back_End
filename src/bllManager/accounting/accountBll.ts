/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 09-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/accounting/index";
import {Singleton} from "typescript-ioc";
import AccountModel from "../../models/accounting/accountModel";
import Utils from "../../utils/utils";
import * as Enum from "../../core/enum/enums"
import * as _ from 'lodash';
import {clientData} from "../../middlewares/filter";

@Singleton
export default class AccountBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.account);
    }

    public getAccountCode(accountModel: AccountModel) {
        let result = null, buildAccountCode = this.getStringBuilder();
        try {
            result = buildAccountCode.append(accountModel.accountClassificationID)
                .append(accountModel.accountTypeID)
                .append(accountModel.accountCode)
                .toString();
        } catch (err) {
            throw err;
        }
        return result;
    }

    public async getAllParentAccount() {
/*
        SELECT
        ac."accountID",
            ac."accountName",
            ac."parentAccountID"
        FROM
        "Account" AS ac
        WHERE
        ac."accountID" IN (
            SELECT
        pa."parentAccountID"
        FROM
        "Account" pa
    )
				AND ac."businessID" IS NULL
				OR ac."businessID" = 1
        OR ac."parentAccountID" IS NULL
        ORDER BY
        ac."accountID"

 -- knex.select('ac.accountID', 'ac.accountName', 'ac.parentAccountID').from('Account as ac')
        -- .whereIn('ac.accountID', knex.select('pa.parentAccountID').from('Account as pa'))
        -- .orWhereNull('ac.parentAccountID')
        -- .orderBy('ac.accountID', 'asc');

        */

        let queryBuilder = this.getRawQueryBuilder();
        let query: string;
        let result: any = null;
        query = queryBuilder.select('ac.accountID', 'ac.accountName', 'ac.parentAccountID').from('Account as ac')
            .whereIn('ac.accountID', queryBuilder.select('pa.parentAccountID').from('Account as pa'))
            .orWhereNull('ac.parentAccountID')
            .orderBy('ac.accountID', 'asc').toString();
        Utils.logger(query);
        try {
            result = await this.dao.executeRawQuery(query, Enum.QueryType.Select);
            if (result != null) {
                Utils.logger('Raw query result', result);
            }
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async checkDuplicateAccount(accountModel: AccountModel) {
        let whereCondition = this.customObject, duplicate = null, result;
        whereCondition.accountClassificationID = accountModel.accountClassificationID;
        whereCondition.accountTypeID = accountModel.accountTypeID;
        whereCondition.accountCode = accountModel.accountCode;
        whereCondition.accountName = accountModel.accountName;
        whereCondition.businessID = accountModel.businessID;

        result = await this.dao.getOneByCondition(whereCondition);
        if (_.isEmpty(result))
            duplicate = false;
        else
            duplicate = true;

        result = duplicate;
        return result;
    }

    public async checkDuplicateAccountCode(accountCode: number) {
        let whereCondition = this.customObject, duplicate = null, result;
        whereCondition.accountCode = accountCode;
        result = await this.dao.getOneByCondition(whereCondition);
        if (_.isEmpty(result))
            duplicate = false;
        else
            duplicate = true;

        result = duplicate;
        return result;
    }

    public async createCOAByBusinessID(givenBusinessID:number){
        let whereCondition = this.customObject,result=null;
        let accounts:AccountModel[],accountsForBusiness:AccountModel[];
        whereCondition.businessID = -1;
        accountsForBusiness = new Array<AccountModel>();
        accounts = await this.dao.getAllByCondition(whereCondition);

        for(let account of accounts){
            account.businessID = givenBusinessID;
            if(clientData!=null){
                account.createdBy = clientData.userID;
                account.updatedBy = clientData.userID;
            }
            delete account.accountID;
            accountsForBusiness.push(account);
        }

        result = await this.bulkSave(accountsForBusiness,'create coa for business');

        return result;

    }
}