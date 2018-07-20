/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 10:44 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class Account extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    accountID: number;

    @Column({type: DataType.INTEGER, unique: 'compositeUnique'})
    businessID: number;

    @Column({type: DataType.INTEGER, unique: 'compositeUnique'})
    accountCode: number;

    @Column({type: DataType.STRING, unique: 'compositeUnique'})
    accountName: string;

    @Column(DataType.INTEGER)
    accountClassificationID: number;

    @Column(DataType.INTEGER)
    accountTypeID: number;

    @Column(DataType.INTEGER)
    parentAccountID: number;

    @Column(DataType.INTEGER)
    taxCodeID: number;

    @Column(DataType.INTEGER)
    cashFlowID: number;

    @Column(DataType.BOOLEAN)
    isDefault: boolean;

    @Column(DataType.INTEGER)
    status: number;
}