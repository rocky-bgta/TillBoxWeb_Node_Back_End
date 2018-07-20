/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/6/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class BasLodgementOption extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    basLodgementOptionID: number



    @Column(DataType.STRING)
    value: string;
}