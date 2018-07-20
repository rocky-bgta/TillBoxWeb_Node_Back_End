/*
* AccessRightRoleMapping model class
* */

import BaseModel from "../../core/abstractClass/baseModel";

export default class AccessRightRoleMappingModel extends BaseModel {
    accessRightRoleMappingID: number;
    accessRightID: number;
    roleID: number;

    constructor() {
        super();
    }
}