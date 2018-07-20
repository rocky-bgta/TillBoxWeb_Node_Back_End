/*
* BusinessContact model class
* */

import BaseModel from "../../core/abstractClass/baseModel";

export default class BusinessContactModel extends BaseModel {
    businessContactID: number;
    businessID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    primaryContact: boolean;

    constructor() {
        super();
    }

}