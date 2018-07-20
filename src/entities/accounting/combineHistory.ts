/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 11:42 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class CombineHistory extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    combineHistoryID: number;

    @Column(DataType.INTEGER)
    combineAccountID: number;

    @Column(DataType.INTEGER)
    referenceID: number;

    @Column(DataType.INTEGER)
    referenceType: number;

    @Column(DataType.INTEGER)
    subReferenceType: number;
}
