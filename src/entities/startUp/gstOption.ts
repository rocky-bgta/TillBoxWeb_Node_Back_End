/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/6/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/

import {Column, DataType, Table} from "sequelize-typescript";
import BaseEntity from "../../core/abstractClass/baseEntity";

@Table
export default class GstOption extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    gstOptionID: number;

    @Column(DataType.STRING)
    value: string;
}