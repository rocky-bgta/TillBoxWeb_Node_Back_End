/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:36 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class JournalModel extends BaseModel {

    journalID: number;
    businessID: number;
    journalReferenceNo: number;
    financialYearID: number;
    date: Date;
    period: number;
    accountID: number;
    amount: number;
    drCrIndicator: number;
    referenceID: number;
    referenceType: number;
    note: string;

    constructor() {
        super();
    }

}