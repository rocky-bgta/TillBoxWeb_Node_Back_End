/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 10:56 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class MoneyTransfer extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    moneyTransferID: number;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.STRING)
    trackingNo : string;

    @Column(DataType.STRING)
    docNumber: string;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.DECIMAL)
    amount: number;

    @Column(DataType.INTEGER)
    accountIDTo: number;

    @Column(DataType.INTEGER)
    accountIDFrom: number;

    @Column(DataType.STRING)
    note: string;
}
