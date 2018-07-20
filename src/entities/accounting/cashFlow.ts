/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 11:40 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class CashFlow extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    cashFlowID: number;

    @Column(DataType.STRING)
    cashFlowName: string;
}
