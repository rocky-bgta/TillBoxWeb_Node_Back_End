/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/17/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class LogType extends BaseEntity {
    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    logTypeID: number;

    @Column(DataType.STRING)
    logTypeName: string;
}