/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/10/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class BusinessType extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    businessTypeID: number;

    @Column(DataType.STRING)
    value: string;
}