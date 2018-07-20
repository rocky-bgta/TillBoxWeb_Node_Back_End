/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/accounting/index";
import {Singleton} from "typescript-ioc";

@Singleton
export default class AccountTypeBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.accountType);
    }
}