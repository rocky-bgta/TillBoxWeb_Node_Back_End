/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/14/17
 *Time: 12:54 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseBll from "../../core/abstractClass/baseBll";
import {Inject, Singleton} from "typescript-ioc";
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/accounting/index";
import Utils from "../../utils/utils";
import * as Enum from "../../core/enum/accounting/enums";
import {QueryType} from "../../core/enum/enums";
//import * as _ from 'lodash';
import JournalModel from "../../models/accounting/journalModel";
import {clientData} from "../../middlewares/filter";
import * as Models from '../../models/accounting';
import * as BLL from "../../bllManager/accounting";
import * as startUpBLL from "../../bllManager/startUp/index";

@Singleton
export default class JournalBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.journal);
    }

    @Inject
    budgetBll: BLL.budget;

    @Inject
    financialYearBll: startUpBLL.financialYear;

    //private budgetModel: Models.budget;
    //private financialYearModel: startUpModels.financialYear;


    public async getFinancialYearFromJournal(id: number, startdate: Date, endDate: Date) {
        let result = null;
        let queryBuilder = this.getRawQueryBuilder(), buildSql;
        Utils.logger('get financialYear from openingBalanceBll');

        try {
            buildSql = queryBuilder('Journal')
                .andWhere('financialYearID', '=', id)
                .andWhere('date', '>', endDate)
                .andWhere('date', '<', startdate).toString();
            result = await this.dao.executeRawQuery(buildSql, QueryType.Select);

            Utils.logger('getFinancialYearJournal from openingBalanceBll', result);
        } catch (err) {
            Utils.logger('Error log', err);
            throw err;
        }
        return result;
    }

    /*public async getReferenceNo() {
        let result = null, referenceNo: number = 0;
        let queryBuilder = this.getRawQueryBuilder(), buildSql;
        Utils.logger('getReferenceNo from openingBalanceBll ');
        try {
            buildSql = queryBuilder.select('journalReferenceNo').from('Journal')
                .orderBy('journalReferenceNo', 'desc')
                .limit(1).toString();

            result = await this.dao.executeRawQuery(buildSql, QueryType.Select);
            if (!_.isEmpty(result)) {
                referenceNo = _.toInteger(result[0].journalReferenceNo);
            }
            referenceNo += 1;
            result = referenceNo;

            Utils.logger('getReferenceNo from openingBalanceBll ', result);
        } catch (err) {
            Utils.logger('Error log ', err);
            throw err;
        }
        return result;
    }*/

    private async buildJournalModel(accountID: number,
                                    businessID: number,
                                    financialYearID: number,
                                    period: number,
                                    amount: number,
                                    date: Date,
                                    referenceNo: number,
                                    drCr: number,
                                    referenceID: number,
                                    referenceType: number,
                                    note?: string) {

        let journalModel: JournalModel;
        try {

            journalModel = new JournalModel();


            /*
             journalModel = new JournalModel();

             // get and set financialYearID ============================================
             let whereCondition = this.customObject;
             whereCondition.businessID = businessID;

             this.budgetModel = await this.budgetBll.getOneByCondition(whereCondition);
             if (this.budgetModel != null) {
                 journalModel.financialYearID = this.budgetModel.financialYearID;
             }
             // =========================================================================

             // determine period ========================================================
             whereCondition = new Object();
             whereCondition.financialYearID = this.budgetModel.financialYearID;
             this.financialYearModel = await this.financialYearBll.getOneByCondition(whereCondition);
             */

            /*
                        let startDate: Date = Utils.getStartDateFromYearMonth(
                            financialYearModel.financialYearStart,
                            financialYearModel.startMonth);

                        let endDate: Date = Utils.getEndDateFromYearMonth(
                            financialYearModel.financialYearEnd,
                            financialYearModel.endMonth);

                        let currentDate = new Date();*/

            //let period = this.financialYearBll.getPeriodOfCurrentFinancialYear(financialYearModel);  //Utils.getCurrentPeriod(startDate, endDate, currentDate);
            //==========================================================================


            if (clientData != null) {
                journalModel.createdBy = clientData.userID;
                journalModel.updatedBy = clientData.userID;
                journalModel.businessID = clientData.businessID;
            } else {
                journalModel.businessID = businessID;
            }

            journalModel.accountID = accountID;
            journalModel.period = period;
            journalModel.amount = amount;
            journalModel.financialYearID = financialYearID;
            journalModel.journalReferenceNo = referenceNo;
            journalModel.drCrIndicator = drCr;
            journalModel.referenceID = referenceID;
            journalModel.referenceType = referenceType;
            journalModel.date = date;
            journalModel.note = note;

        } catch (err) {
            Utils.logger('Error log ', err);
            throw err;
        }
        return journalModel;
    }


    public async getEntryForInsert(accountClassificationID: number,
                                   accountType: number,
                                   isParent: boolean,
                                   accountID: number,
                                   businessID: number,
                                   financialYearID: number,
                                   period: number,
                                   journalReferenceNo: number,
                                   amount: number,
                                   date: Date,
                                   referenceID: number,
                                   referenceType: number,
                                   note: string) {

        let drCrIndicator: number;

        drCrIndicator = this.debitCreditDecisionMaker(accountClassificationID, accountType, isParent, referenceType);

        /*if (classificationID == Enum.AccountClassification.Asset && isParent) {
            drCrIndicator = Enum.DebitCreditIndicator.Debit;
        } else {
            drCrIndicator = Enum.DebitCreditIndicator.Credit;
        }*/

        let journalModel: Models.journal; //= new Models.journal();

        journalModel = await this.buildJournalModel(
            accountID,
            businessID,
            financialYearID,
            period,
            amount,
            date,
            journalReferenceNo,
            drCrIndicator,
            referenceID,//for example OpeningBalanceID
            referenceType,// for example OpeningBalance from ENUM
            note
        );
        return journalModel;
    }

    public async updateJournalEntry(businessID: number,
                                    referenceType: number,
                                    referenceID: number,
                                    amount: number,
                                    accounts: number[]) {


        let journalModels: Models.journal[];
        //let result=null;

        let whereCondition = this.customObject;
        whereCondition.businessID = businessID;
        whereCondition.referenceID = referenceID;
        whereCondition.referenceType = referenceType;
        try {
            journalModels = await this.dao.getAllByCondition(whereCondition, 'drCrIndicator');
            if (journalModels != null) {
                for (let journalModel of journalModels) {
                    journalModel.amount = amount;

                    if (journalModel.drCrIndicator == Enum.DebitCreditIndicator.Debit) {
                        journalModel.accountID = accounts[0];//from account
                    } else {
                        journalModel.accountID = accounts[1];//to account
                    }

                    whereCondition = new Object();
                    whereCondition.journalID = journalModel.journalID;
                    await this.dao.updateByCondition(journalModel, whereCondition);
                }
            } else throw Error;
        } catch (err) {
            throw err;
        }
        return journalModels;
    }

    debitCreditDecisionMaker(accountClassification: number, accountType: number, isParent: boolean, referenceType: number) {
        let drCrIndicator: number = null;

        if (referenceType == Enum.ReferenceType.MoneyTransfer) {
            if (accountClassification == Enum.AccountClassification.Asset
                && accountType == Enum.AccountType.CurrentAsset && isParent) {
                drCrIndicator = Enum.DebitCreditIndicator.Credit;
            } else {
                drCrIndicator = Enum.DebitCreditIndicator.Debit;
            }
        }

        if (referenceType == Enum.ReferenceType.OpeningBalance) {
            if (accountClassification == Enum.AccountClassification.Asset
                && accountType == Enum.AccountType.CurrentAsset && isParent) {
                drCrIndicator = Enum.DebitCreditIndicator.Debit;
            } else {
                drCrIndicator = Enum.DebitCreditIndicator.Credit;
            }
        }

        if (referenceType == Enum.ReferenceType.CombineAccount) {
            if (accountClassification == Enum.AccountClassification.Asset
                && accountType == Enum.AccountType.CurrentAsset && isParent) {
                drCrIndicator = Enum.DebitCreditIndicator.Credit;
            } else {
                drCrIndicator = Enum.DebitCreditIndicator.Debit;
            }
        }
        return drCrIndicator;
    }

    /* getPeriodOfCurrentFinancialYear(financialYearModel:startUpModels.financialYear){
         let startDate: Date = Utils.getStartDateFromYearMonth(
             financialYearModel.financialYearStart,
             financialYearModel.startMonth);

         let endDate: Date = Utils.getEndDateFromYearMonth(
             financialYearModel.financialYearEnd,
             financialYearModel.endMonth);

         let currentDate = new Date();
         let period = Utils.getCurrentPeriod(startDate, endDate, currentDate);
         return period;
     }*/
}