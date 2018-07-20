/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/10/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import ProductTypeModel from "./productTypeModel";
import BusinessTypeModel from "./businessTypeModel";
import BaseModel from "../../core/abstractClass/baseModel";

export default class AddBusinessOptionModel extends BaseModel {
    productType: Array<ProductTypeModel>;
    businessType: Array<BusinessTypeModel>;

    constructor() {
        super();
    }

    public getProductType() {
        return this.productType;
    }

    public setProductType(productType: Array<ProductTypeModel>) {
        this.productType = productType;
    }

    public getBusinessType() {
        return this.businessType;
    }

    public setBusinessType(businessType: Array<BusinessTypeModel>) {
        this.businessType = businessType;
    }
}