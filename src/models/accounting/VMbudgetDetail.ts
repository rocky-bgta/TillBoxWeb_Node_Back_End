/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 13-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import * as Models from "../../models/accounting"


export class AccountBudgetDetail{

    constructor(){
    }
    public account: Models.account;
    public budgetDetail: Models.budgetDetail[];
}

export default class VMbudgetDetail{

    //public account: Models.account;
    public budget: Models.budget;
    public accountBudgetDetail: AccountBudgetDetail[];

   //public budgetDetail: Models.budgetDetail[];

    constructor() {
    }


}