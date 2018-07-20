/*
* User model class
* */

import BaseModel from "../../core/abstractClass/baseModel";
import {Status} from "../../core/enum/enums";

export default class UserModel extends BaseModel {
    userID: string;
    name: string;
    surname: string;
    cellPhone: string;
    password: string;

    constructor() {
        super();
        this.status = Status.Active;
    }
}