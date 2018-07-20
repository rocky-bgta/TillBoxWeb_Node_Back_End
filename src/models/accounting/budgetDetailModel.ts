/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:34 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class BudgetDetailModel extends BaseModel {
    budgetDetailID: number;
    budgetID: number;
    accountTypeID: number;
    accountID: number;
    period: number;
    amount: number;

    constructor() {
        super();
    }
}