/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 20-Nov-17
 *Time: 11:50 AM
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class OpeningBalanceModel extends BaseModel {

    openingBalanceID: number;
    accountID: number;
    businessID: number;
    amount: number;
    date: Date;
    note:string;
    referenceID: number;
    referenceType: number;

    constructor() {
        super();
        this.date = new Date();
        this.referenceType = 0;
    }

}