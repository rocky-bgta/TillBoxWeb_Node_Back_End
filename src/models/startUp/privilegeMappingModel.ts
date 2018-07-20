/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/24/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";

export default class PrivilegeMappingModel extends BaseModel {
    privilegeServiceMappingID: number;
    privilegeID: number;
    serviceURI: string;

    constructor() {
        super();
    }
}