/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 2:57 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";
//import {IsInt, IsLength} from "validator.ts/decorator/Validation";

export default class AccountClassificationModel extends BaseModel {

    accountClassificationID: number;

    //businessID: number;

    //@IsLength(1, 30)
    name: string;

    //@IsInt({min: 1, max: 5})
    code: number;

    constructor() {
        super();
    }
}