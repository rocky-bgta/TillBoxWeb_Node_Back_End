/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 4:14 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";
import {IsInt, IsLength} from "validator.ts/decorator/Validation";


export default class AccountModel extends BaseModel {

    accountID: number;

    businessID: number;

    @IsInt({min: 1, max: 9999})
    accountCode: number;

    @IsLength(1, 30)
    accountName: string;

    @IsInt({min: 1, max: 5})
    accountClassificationID: number;

    @IsInt({min: 1, max: 9})
    accountTypeID: number;

    parentAccountID: number;

    @IsInt()
    taxCodeID: number;

    @IsInt({min: 1, max: 3})
    cashFlowID: number;

    isDefault: boolean;

    status: number;

    constructor() {
        super();
    }
}