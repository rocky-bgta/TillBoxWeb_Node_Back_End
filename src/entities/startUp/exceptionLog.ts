/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/18/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Column, DataType, Table} from "sequelize-typescript";
import BaseEntity from "../../core/abstractClass/baseEntity";

@Table
export default class ExceptionLog extends BaseEntity{

    @Column({primaryKey: true, autoIncrement:true})
    exceptionLogID: number;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.INTEGER)
    priority: number;

    @Column(DataType.TEXT)
    pageName: string;

    @Column(DataType.TEXT)
    service: string;

    @Column(DataType.TEXT)
    module: string;

    @Column(DataType.TEXT)
    userID: string;

    @Column(DataType.JSON)
    requestObject: string;

    @Column(DataType.TEXT)
    message: string;

    @Column(DataType.JSON)
    messageTrace: string;

    @Column(DataType.BOOLEAN)
    isSolved: boolean;
}