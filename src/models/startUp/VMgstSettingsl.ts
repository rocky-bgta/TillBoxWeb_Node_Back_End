/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/5/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";
import EnumGstSetting from "../../core/enum/EnumGstSetting";
import CommonIdValueModel from "./commonIdValueModel";

export default class GstSettingsViewModel extends BaseModel {
    userID: string;
    isRegistered: boolean;
    accountingBasic: number;
    reportingFrequency: number;
    selectedGstOption: number;
    selectedBasLodgement: number;
    annualReportingDate: Date;
    accountingOption: Array<CommonIdValueModel>;
    reportingOption: Array<CommonIdValueModel>;
    gstOption: Array<string>;
    basLodgementOption: Array<string>;

    constructor() {
        super();
        this.isRegistered = true;
        this.accountingBasic = 1;
        this.reportingFrequency = 1;
        this.selectedGstOption = 1;
        this.selectedBasLodgement = 1;
        this.accountingOption = EnumGstSetting.getAccountingOptions();
        this.reportingOption = EnumGstSetting.getReportingFrequencyOption();
        this.gstOption = new Array<string>();
        this.basLodgementOption = new Array<string>();
    }
}