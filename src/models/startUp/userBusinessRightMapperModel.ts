/*
* UserRightMapper model class
* */

import BaseModel from "../../core/abstractClass/baseModel";
import {Status} from "../../core/enum/enums";

export default class UserBusinessRightMapperModel extends BaseModel {
    userBusinessRightMapperID: number;
    userID: string;
    firstName: string;
    lastName: string;
    businessID: number;
    accessRightID: number;
    status: number;

    constructor() {
        super();
        this.status = Status.Active;
    }
}