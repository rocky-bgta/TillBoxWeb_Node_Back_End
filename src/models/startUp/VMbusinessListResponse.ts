/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/13/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import VMBusinessModel from "./VMbusiness";
import CommonIdValueModel from "./commonIdValueModel";
import PrivilegeModel from "./privilegeModel";

export default class VMBusinessListResponse extends VMBusinessModel {
    businessList: Array<VMBusinessModel>;
    statusOptions: Array<CommonIdValueModel>;
    privlegeOptions: Array<PrivilegeModel>;

    constructor() {
        super();
    }
}