import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class BusinessDetails extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    businessDetailsID: number;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.INTEGER)
    financialYearID: number;

    @Column(DataType.STRING)
    tradingName: string;

    @Column(DataType.STRING)
    abnacn: string;

    @Column(DataType.STRING)
    abnBranch: string;

    @Column(DataType.BOOLEAN)
    taxPaymentsReporting: Boolean;

    @Column(DataType.STRING)
    emailAddress: string;

    @Column(DataType.STRING)
    phone: string;

    @Column(DataType.STRING)
    fax: string;

    @Column(DataType.STRING)
    website: string;

    @Column(DataType.DATE)
    openingBalanceDate: Date;

    @Column(DataType.DATE)
    lockmyDataAt: Date;

}