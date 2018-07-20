/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 09-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */

import * as Models from "../../models/accounting"

export default class VMaccountDropDownList {

    public accountTypeList: Models.accountType[];
    public accountList: Models.account[];
    public taxCodeList: Models.taxCode[];
    public cashFlow: Models.cashFlow[];
    public accountClassification: Models.accountClassification[];

    constructor() {
    }
}
