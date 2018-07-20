/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:29 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class TaxCodeModel extends BaseModel {
    taxCodeID: number;
    taxType: number;
    taxCode: string;
    taxRate: number;
    taxDescription: string;
    taxCollectedAccountID: number;
    taxPaidAccountID: number;

    constructor() {
        super();
    }
}