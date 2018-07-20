/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/13/17
 *Time: 2:40 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import {Singleton} from "typescript-ioc";
import * as Entities from "../../entities/startUp/index";

@Singleton
export default class FinancialYearBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.financialYear);
    }


}