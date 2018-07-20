/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:43 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class CombineHistoryModel extends BaseModel {
    combineHistoryID: number;
    combineAccountID: number;
    referenceID: number;
    referenceType: number;
    subReferenceID: number;

    constructor() {
        super();
    }
}