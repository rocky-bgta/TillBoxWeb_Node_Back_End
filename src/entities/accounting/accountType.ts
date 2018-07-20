/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 11:04 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class AccountType extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    accountTypeID: number;

    @Column(DataType.INTEGER)
    accountClassificationID: number;

    @Column(DataType.STRING)
    typeName: string;

    @Column(DataType.INTEGER)
    code: number;
}
