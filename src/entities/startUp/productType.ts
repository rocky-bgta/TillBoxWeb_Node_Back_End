/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/10/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseEntity from "../../core/abstractClass/baseEntity";
import {AutoIncrement, Column, DataType, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class ProductType extends BaseEntity {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    productTypeID: number;

    @Column(DataType.STRING)
    value: string;

}