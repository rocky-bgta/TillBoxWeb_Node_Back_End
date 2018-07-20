/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 11:27 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class Journal extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.BIGINT)
    journalID: number;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.BIGINT)
    journalReferenceNo: number;

    @Column(DataType.INTEGER)
    financialYearID: number;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.INTEGER)
    period: number;

    @Column(DataType.INTEGER)
    accountID: number;

    @Column(DataType.DECIMAL)
    amount: number;

    @Column(DataType.INTEGER)
    drCrIndicator: number;

    @Column(DataType.INTEGER)
    referenceID: number;

    @Column(DataType.INTEGER)
    referenceType: number;

    @Column(DataType.STRING)
    note: string;
}
