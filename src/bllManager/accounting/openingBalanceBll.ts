/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 20-Nov-17
 *Time: 11:53 AM
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Singleton} from "typescript-ioc";
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/accounting/index";

@Singleton
export default class OpeningBalanceBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.openingBalance);
    }
}