/*
* BusinessDetails model class
* */

import BaseModel from "../../core/abstractClass/baseModel";

export default class BusinessDetailsModel extends BaseModel {
    businessDetailsID: number;
    businessID: number;
    financialYearID: number;
    tradingName: string;
    abnacn: string;
    abnBranch: string;
    taxPaymentsReporting: boolean;
    emailAddress: string;
    phone: string;
    fax: string;
    website: string;
    openingBalanceDate: Date;
    lockmyDataAt: Date;

    constructor() {
        super();
    }
}