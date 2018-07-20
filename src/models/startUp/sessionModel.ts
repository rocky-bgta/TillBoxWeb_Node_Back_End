/*
* Session model class
* */

import BaseModel from "../../core/abstractClass/baseModel";

export default class SessionModel extends BaseModel {
    sessionID: number;
    userID: string;
    token: string;
    start: Date;
    end: Date;
    duration: number;
    loginStatus: number;
    refreshToken: string;
    businessDBName: string;
    businessID: number;

    constructor() {
        super();
    }
}