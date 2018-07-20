/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/5/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import SessionModel from "./sessionModel";
import BusinessModel from "./businessModel";
import BaseModel from "../../core/abstractClass/baseModel";
import UserModel from "./userModel";

export default class LogInResponseModel extends BaseModel {
    session: SessionModel;
    businessList: Array<BusinessModel>;
    user: UserModel;

    constructor() {
        super();
    }

    public getUser() {
        return this.user;
    }

    public setUser(user: UserModel) {
        this.user = user;
    }

    public getSession(): SessionModel {
        return this.session;
    }

    public setSession(value: SessionModel) {
        this.session = value;
    }

    public getBusinessList(): Array<BusinessModel> {
        return this.businessList;
    }

    public setBusinessList(value: Array<BusinessModel>) {
        this.businessList = value;
    }
}