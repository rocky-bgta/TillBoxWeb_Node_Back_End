/**
 *Created By: Md. Abdul Hannan
 *Created Date: 14-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/accounting/index";
import * as _ from "lodash";
import Utils from "../../utils/utils";
import {QueryType} from "../../core/enum/enums";
import * as Enum from "../../core/enum/accounting/enums";
import * as Models from '../../models/accounting';

@Singleton
export default class MoneyTransferBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.moneyTransfer);
    }

    async getAvailableBalanceByAccountID(accountID: number, accountType:number, businessID:number) {

        let result=null, availableBalance: number = 0;
        let queryBuilder = this.getRawQueryBuilder(), buildSql;
        let debit:number=0,credit:number=0;
        try {
            buildSql =
                 queryBuilder.select('accountID','drCrIndicator')
                     .sum('amount')
                     .from('Journal')
                     .where('accountID',accountID)
                     .andWhere('businessID', businessID)
                     .groupBy('drCrIndicator','accountID')
                .orderBy('drCrIndicator', 'asc')
                .toString();

            result = await this.dao.executeRawQuery(buildSql, QueryType.Select);

            if (!_.isEmpty(result)) {

                if(!this.lodash.isEmpty(result[0]) && result[0].drCrIndicator==Enum.DebitCreditIndicator.Debit){
                    debit = this.lodash.toNumber(result[0].sum);
                }

                if(!this.lodash.isEmpty(result[0]) && result[0].drCrIndicator==Enum.DebitCreditIndicator.Credit){
                    credit = this.lodash.toNumber(result[0].sum);
                }

                if(!this.lodash.isEmpty(result[1]) && result[1].drCrIndicator==Enum.DebitCreditIndicator.Debit){
                    debit = this.lodash.toNumber(result[1].sum);
                }

                if(!this.lodash.isEmpty(result[1]) && result[1].drCrIndicator==Enum.DebitCreditIndicator.Credit){
                    credit = this.lodash.toNumber(result[1].sum);
                }

                if(accountType==Enum.AccountType.CurrentAsset) {
                    availableBalance = debit - credit;
                }

            }
            result = availableBalance;

        } catch (err) {
            Utils.logger('Error log ', err);
            throw err;
        }
        return result;
    }


   public async isFromToAccountSameBeforeUpdate(givenMoneyTransferModel: Models.moneyTransfer):Promise<boolean>{
        let previousMoneyTransferModel: Models.moneyTransfer;
        let whereCondition = this.customObject;
        try{
            whereCondition.moneyTransferID = givenMoneyTransferModel.moneyTransferID;
            previousMoneyTransferModel = await this.getOneByCondition(whereCondition);

            if(previousMoneyTransferModel.accountIDFrom == givenMoneyTransferModel.accountIDFrom &&
                    previousMoneyTransferModel.accountIDTo == givenMoneyTransferModel.accountIDTo)
                return true;
            else
                return false;
        }catch (err) {
            Utils.logger('Error log ', err);
            throw err;
        }
    }
}

