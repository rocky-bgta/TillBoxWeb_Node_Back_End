/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:28 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class AccountTypeModel extends BaseModel {
    accountTypeID: number;
    accountClassificationID: number;
    typeName: string;
    code: number;

    constructor() {
        super();
    }
}