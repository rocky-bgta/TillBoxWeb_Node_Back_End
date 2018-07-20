import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class FinancialYear extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    financialYearID: number;

    @Column(DataType.STRING)
    financialYearName: string;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.INTEGER)
    financialYearStart: number;

    @Column(DataType.INTEGER)
    financialYearEnd: number;

    @Column(DataType.INTEGER)
    startMonth: number;

    @Column(DataType.INTEGER)
    endMonth: number;

    @Column(DataType.DATE)
    openingBalanceDate: Date;

    @Column(DataType.DATE)
    lockmyDataAt: Date;

    @Column(DataType.INTEGER)
    status: number;

    @Column(DataType.BOOLEAN)
    isCurrentFinancialYear: boolean;
}