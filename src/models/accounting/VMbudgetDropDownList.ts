/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 13-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import * as Models from "../../models/accounting"
import * as startUpModels from "../startUp/index"
export default class VMbudgetDropDownList{

    public financialYearList: startUpModels.financialYear[];
    public accountTypeList: Models.accountType[];

    constructor() {
    }
}