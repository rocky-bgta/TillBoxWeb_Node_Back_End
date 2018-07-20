/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/25/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */

import Dao from "../../dataAccess/dao";
import CustomerEntity from "../../entities/startUp/customer";
//import * as aud from "auditLog";
import BaseBll from "../../core/abstractClass/baseBll";

export default class demoBLL extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(CustomerEntity);
    }

   /* test() {
        aud.auditLog.staticTest();
        let ate = new aud.auditLog();
        ate.intanceMa();
    }*/


}