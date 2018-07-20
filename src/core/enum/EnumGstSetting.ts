/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/5/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import CommonIdValueModel from "../../models/startUp/commonIdValueModel";

export default class EnumGstSetting {

    static getAccounting(position: number) {
        return EnumAccountingBasis[position - 1];
    }

    static getAccountingOptions() {
        let result = new Array<CommonIdValueModel>();
        let enumSize: number = Object.keys(EnumAccountingBasis).length / 2;
        for (let i = 0; i < enumSize; i++) {
            let model: CommonIdValueModel = new CommonIdValueModel();
            model.id = (i + 1);
            model.value = EnumAccountingBasis[i];
            result.push(model);
        }
        return result;
    }

    static getReportingFrequency(position: number) {
        return EnumReportingFrequency[position - 1];
    }

    static getReportingFrequencyOption() {
        let result = new Array<CommonIdValueModel>();
        let enumSize: number = Object.keys(EnumReportingFrequency).length / 2;
        for (let i = 0; i < enumSize; i++) {
            let model: CommonIdValueModel = new CommonIdValueModel();
            model.id = (i + 1);
            model.value = EnumReportingFrequency[i];
            result.push(model);
        }
        return result;
    }
}

enum EnumAccountingBasis {
    Cash, Accruals
}

enum EnumReportingFrequency {
    Monthly, Quarterly, Annualy
}