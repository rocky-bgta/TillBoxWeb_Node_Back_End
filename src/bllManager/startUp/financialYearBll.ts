/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/9/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */

import Dao from "../../dataAccess/dao";
import Utils from "../../utils/utils";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {QueryType} from "../../core/enum/enums";
import * as Models from '../../models/startUp';

let moment = require('moment');
export default class FinancialYearBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.financialYear);
    }

    /* async saveFinancialYear(financialYearModel: FinancialYearModel) {
         let result;
         Utils.logger('saveOrUpdateFinancialYear method from userBll');
         try {
             result = await this.dao.save(financialYearModel);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

     public async getAllFinancialYears() {
         let result;
         Utils.logger('getAllFinancialYears method from financialYearBll');
         try {
             result = await this.dao.getAll();
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }*/

    /* public async isDuplicateFinancialYearName(name: string) {
         let result;
         let whereCondition = this.customObject;
         try {
             whereCondition.financialYearName = name;
             result = await this.dao.getOneByCondition(whereCondition);
         } catch (err) {
             Utils.logger('financialYear bll Error Log ', err);
             throw  err;
         }
         return result;
     }*/

    public async getCurrentAndFutureFinancialYear(year: number, businessId: number) {
        let result = null;
        Utils.logger('get current financial year from financialYearBll');
        let queryBuilder = this.getRawQueryBuilder(), buildSql;

        try {
            buildSql = queryBuilder('FinancialYear')
                .orWhere('financialYearStart', '>', year)
                .orWhere('financialYearStart', '=', year)
                .andWhere('businessID', '=', businessId).toString();
            result = await this.dao.executeRawQuery(buildSql, QueryType.Select);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    /*public async updateFinancialYear(id: number, financialYearModel: FinancialYearModel) {
        let result, whereCondition = this.customObject;
        Utils.logger('updateFinancialYear method from userBll');

        try {
            whereCondition.financialYearID = id;
            result = await this.dao.updateByCondition(financialYearModel, whereCondition);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }*/

    /*  public async deleteFinancialYear(id: string) {
          Utils.logger('deleteFinancialYear method from userBll');
          let result, whereCondition = this.customObject;
          try {
              whereCondition.financialYearID = id;
              result = await this.dao.deleteByCondition(whereCondition);
          } catch (err) {
              Utils.logger('Error Log', err);
              throw err;
          }
          return result;
      }*/

    public async getCurrentFinancialYear(businessId: number): Promise<Models.financialYear> {
        let result, whereCondition = this.customObject;
        Utils.logger('getCurrentFinancialYear from financialYearBll');
        let financialYearModel: Models.financialYear;
        try {
            whereCondition.businessID = businessId;
            whereCondition.isCurrentFinancialYear = true;

            financialYearModel = await this.dao.getOneByCondition(whereCondition);
            if (!this.lodash.isEmpty(financialYearModel)) {
                result = financialYearModel;
            } else {
                financialYearModel = null;
                result = financialYearModel;
            }
        } catch (err) {
            Utils.logger('Error log', err);
            throw err;
        }
        return result;
    }

    public async selectCurrentFinancialYear(businessID: number): Promise<any> {
        let financialYearModels: Models.financialYear[];
        let whereCondition = this.customObject;
        whereCondition.businessID = businessID;
        financialYearModels = await this.dao.getAllByCondition(whereCondition);
        let startDate: Date, endDate: Date;

        let currentFinancialYear: Models.financialYear;
        let now = moment();

        for (let financialYearModel of financialYearModels) {
            startDate = Utils.getStartDateFromYearMonth(financialYearModel.financialYearStart, financialYearModel.startMonth);
            endDate = Utils.getEndDateFromYearMonth(financialYearModel.financialYearEnd, financialYearModel.endMonth);

            if ((now < endDate) && (now >= startDate)) {
                currentFinancialYear = financialYearModel;
                break;
            }
        }
        return currentFinancialYear;
    }

    public async validateInputFinancialYear(businessID: number, givenStartDate: Date, givenEndDate: Date) {
        let result: boolean = true;
        let financialYearModels: Models.financialYear[];
        let whereCondition = this.customObject;
        whereCondition.businessID = businessID;

        financialYearModels = await this.dao.getAllByCondition(whereCondition);
        let startDate: Date, endDate: Date;

        let givenStartMoment = moment(givenStartDate);
        let givenEndMoment = moment(givenEndDate);

        for (let financialYearModel of financialYearModels) {

            startDate = Utils.getStartDateFromYearMonth(financialYearModel.financialYearStart, financialYearModel.startMonth);
            endDate = Utils.getEndDateFromYearMonth(financialYearModel.financialYearEnd, financialYearModel.endMonth);

            if ((givenStartMoment >= startDate) && (givenEndMoment <= endDate)
                ||
                ((givenStartMoment < startDate) && (givenEndMoment > startDate && givenEndMoment <= endDate))) {
                Utils.logger('Date over lap');
                result = false;
                break;
            }

            if ((givenStartMoment >= endDate)) {
                Utils.logger(' Valid date');
                result = true;
                break;
            }
        }
        return result;
    }

    public async checkDuplicateFinancialYearName(financialYearName: string, businessID: number) {
        let result, whereCondition = this.customObject;
        try {
            whereCondition.financialYearName = financialYearName;
            whereCondition.businessID = businessID;

            result = await this.dao.getOneByCondition(whereCondition);

        } catch (err) {
            Utils.logger('Error log', err);
            throw err;
        }
        return result;
    }

    public async isValidFinancialYearID(id: number) {
        let result: boolean = false, financialYearModel: Models.financialYear, whereCondition = this.customObject;
        try {
            whereCondition.financialYearID = id;
            financialYearModel = await this.dao.getOneByCondition(whereCondition);

            if (financialYearModel != null) {
                result = true;
            }
        } catch (err) {
            Utils.logger('Error log', err);
            throw err;
        }
        return result;
    }

    getPeriodOfCurrentFinancialYear(financialYearModel: Models.financialYear) {
        let startDate: Date = Utils.getStartDateFromYearMonth(
            financialYearModel.financialYearStart,
            financialYearModel.startMonth);

        let endDate: Date = Utils.getEndDateFromYearMonth(
            financialYearModel.financialYearEnd,
            financialYearModel.endMonth);

        let currentDate = new Date();

        let period = Utils.getCurrentPeriod(startDate, endDate, currentDate);
        return period;
    }
}