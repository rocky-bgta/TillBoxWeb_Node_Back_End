/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/25/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import * as Models from "./index";

export default class VMRolePrivilegeMapping {
    rolePrivilegeMappingID: number;
    roleID: number;
    roleName: string;
    privilegeID: number;
    privilegeList: Array<Models.rolePrivilegeMapping>;

    constructor() {
        this.privilegeList = new Array<Models.rolePrivilegeMapping>();
    }
}