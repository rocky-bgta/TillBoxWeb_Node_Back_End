/*
* ForgetPasswordToken model class
* */


import BaseModel from "../../core/abstractClass/baseModel";

export default class ForgetPasswordTokenModel extends BaseModel {
    forgetPasswordTokenID:number;
    userID: string;
    token: string;
    validation: Date;

    constructor() {
        super();
    }
}