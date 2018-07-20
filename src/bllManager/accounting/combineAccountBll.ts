/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/14/17
 *Time: 12:43 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseBll from "../../core/abstractClass/baseBll";
import * as Entities from "../../entities/accounting/index"
import Dao from "../../dataAccess/dao";
import {Singleton} from "typescript-ioc";

@Singleton
export default class CombineAccountBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.combineAccount);
    }
}