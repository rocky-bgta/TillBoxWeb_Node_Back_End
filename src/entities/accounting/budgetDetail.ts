/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 11:24 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class BudgetDetail extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    budgetDetailID: number;

    @Column(DataType.INTEGER)
    budgetID: number;

    @Column(DataType.INTEGER)
    accountTypeID: number;

    @Column(DataType.INTEGER)
    accountID: number;

    @Column(DataType.INTEGER)
    period: number;

    @Column(DataType.DECIMAL)
    amount: number;
}
