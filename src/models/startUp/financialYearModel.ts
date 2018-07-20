/*
* financialYear model class
* */

import BaseModel from "../../core/abstractClass/baseModel";

export default class FinancialYearModel extends BaseModel {
    financialYearID: number;
    financialYearName: string;
    businessID: number;
    financialYearStart: number;
    financialYearEnd: number;
    startMonth: number;
    endMonth: number;
    openingBalanceDate: Date;
    lockmyDataAt: Date;
    status: number;
    isCurrentFinancialYear: boolean;

    constructor() {
        super();
    }
}