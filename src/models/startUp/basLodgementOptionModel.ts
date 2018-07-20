/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/6/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";

export default class BasLodgementOptionModel extends BaseModel {
    basLodgementOptionID: number;
    value: string;

    constructor() {
        super();
        this.basLodgementOptionID = 1;
        this.value = "";
    }
}