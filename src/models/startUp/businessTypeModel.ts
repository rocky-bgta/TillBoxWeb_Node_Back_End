/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/10/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";

export default class BusinessTypeModel extends BaseModel {
    businessTypeID: number;
    value: string;

    constructor() {
        super();
    }
}