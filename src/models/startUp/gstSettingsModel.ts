/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/4/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/

import BaseModel from "../../core/abstractClass/baseModel";

export default class GstSettingsModel extends BaseModel {
    gstSettingsID: number;
    userID: string;
    businessID: number;
    isRegistered: boolean;
    accountingBasic: number;
    reportingFrequency: number;
    gstOption: number;
    basLodgement: number;
    annualReportDate: Date;
    selectedGstOption: number;
    selectedBasLodgement: number;

    constructor() {
        super();
        this.isRegistered = true;
        this.accountingBasic = 1;
        this.reportingFrequency = 1;
        this.selectedGstOption = 1;
        this.selectedBasLodgement = 1;
        this.annualReportDate = new Date();
    }
}