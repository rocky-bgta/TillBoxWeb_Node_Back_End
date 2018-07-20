/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 11:22 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class Budget extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    budgetID: number;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.INTEGER)
    financialYearID: number;

}
