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
export default class LogMessage extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    logMessageID: number;

    @Column(DataType.INTEGER)
    logID: number;

    @Column(DataType.STRING)
    userID: string;

    @Column(DataType.INTEGER)
    moduleID: number;

    @Column(DataType.STRING)
    formName: string;

    @Column(DataType.STRING)
    calledFunction: string;

    @Column(DataType.INTEGER)
    actionID: number;

    @Column(DataType.INTEGER)
    userRightID: number;

    @Column(DataType.INTEGER)
    userTypeID: number;

    @Column(DataType.STRING)
    logMessage: string;

    @Column(DataType.STRING)
    logRefMessage: string;

    @Column(DataType.BOOLEAN)
    isObject: boolean;

    @Column(DataType.DATE)
    dateTime: Date;

    @Column(DataType.INTEGER)
    logTypeID: number;

    @Column(DataType.INTEGER)
    sessionID: number;
}