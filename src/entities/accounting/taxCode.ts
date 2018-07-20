/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/7/17
 *Time: 11:07 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */

import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class TaxCode extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    taxCodeID: number;

    @Column(DataType.INTEGER)
    taxType: number;

    @Column(DataType.STRING)
    taxCode: string;

    @Column(DataType.DOUBLE)
    taxRate: number;

    @Column(DataType.STRING)
    taxDescription: string;

    @Column(DataType.INTEGER)
    taxCollectedAccountID: number;

    @Column(DataType.INTEGER)
    taxPaidAccountID: number;
}
