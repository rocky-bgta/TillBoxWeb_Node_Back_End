/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 15-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/accounting/index";

@Singleton
export default class CashFlowBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.cashFlow);
    }
}