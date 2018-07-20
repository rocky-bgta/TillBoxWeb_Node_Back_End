/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/6/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";

export default class GstOptionModel extends BaseModel {
    gstOptionID: number;
    value: string;

    constructor() {
        super();
        this.gstOptionID = 1;
        this.value = "";
    }
}