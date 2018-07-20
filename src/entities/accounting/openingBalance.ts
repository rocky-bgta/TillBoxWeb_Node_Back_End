/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 20-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseEntity from "../../core/abstractClass/baseEntity";
import {AutoIncrement, Column, DataType, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class OpeningBalance extends BaseEntity {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    openingBalanceID: number;

    @Column(DataType.INTEGER)
    accountID: number;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.DECIMAL)
    amount: number;

    @Column(DataType.STRING())
    note: string;

    @Column(DataType.DATE)
    date: Date;

    @Column(DataType.INTEGER)
    referenceID: number;

    @Column(DataType.INTEGER)
    referenceType: number;

}