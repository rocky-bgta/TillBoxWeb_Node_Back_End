/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/17/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";

export default class LogActionModel extends BaseModel {
    logActionID: number;
    actionID: number;
    actionName: string;

    constructor() {
        super();
    }
}