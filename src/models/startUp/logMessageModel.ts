/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/17/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";

export default class LogMessageModel extends BaseModel {
    logMessageID: number;
    logID: number;
    userID: string;
    moduleID: number;
    formName: string;
    calledFunction: string;
    actionID: number;
    userRightID: number;
    userTypeID: number;
    logMessage: string;
    logRefMessage: string;
    isObject: boolean;
    dateTime: Date;
    logTypeID: number;
    sessionID: number;

    constructor() {
        super();
        this.dateTime = new Date();
    }
}