/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/13/17
 *Time: 6:53 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseBll from "../../core/abstractClass/baseBll";
import * as Entities from "../../entities/accounting/index";
import Dao from "../../dataAccess/dao";
import {Singleton} from "typescript-ioc";

@Singleton
export default class AccountClassificationBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.accountClassification);
    }
}