/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:25 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class MoneyTransferModel extends BaseModel {
    moneyTransferID: number;
    businessID: number;
    trackingNo : string;
    docNumber: string;
    date: Date;
    amount: number;
    accountIDTo: number;
    accountIDFrom: number;
    note: string;

    constructor() {
        super();
    }
}