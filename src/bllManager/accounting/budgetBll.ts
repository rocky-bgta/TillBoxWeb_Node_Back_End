/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 13-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import Budget from "../../entities/accounting/budget";

@Singleton
export default class BudgetBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Budget);
    }
}

