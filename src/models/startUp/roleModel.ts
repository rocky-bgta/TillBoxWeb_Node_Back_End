/*
* Role model class
* */

import BaseModel from "../../core/abstractClass/baseModel";

export default class RoleModel extends BaseModel {
    roleID: number;
    name: string;
    description: string;

    constructor() {
        super();
    }
}