/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/10/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseModel from "../../core/abstractClass/baseModel";

export default class ProductTypeModel extends BaseModel {
    id: number;
    value: string;


    getId(): number {
        return this.id;
    }

    setId(value: number) {
        this.id = value;
    }

    getValue(): string {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
    }
}