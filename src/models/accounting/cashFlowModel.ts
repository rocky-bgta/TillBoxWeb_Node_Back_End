/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:41 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class CashFlowModel extends BaseModel {
    cashFlowID: number;
    cashFlowName: string;

    constructor() {
        super();
    }
}