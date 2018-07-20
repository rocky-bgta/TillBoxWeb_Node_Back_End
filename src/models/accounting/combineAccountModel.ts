/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:38 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class CombineAccountModel extends BaseModel {
    combineAccountID: number;
    businessID: number;
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