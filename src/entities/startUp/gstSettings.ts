/**
 *
 * :=  coded with fun by Shuza Sa
 * :=  shuza.sa@gmail.com
 * :=  www.shuza.me
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import {Column, DataType, Table} from "sequelize-typescript";
import BaseEntity from "../../core/abstractClass/baseEntity";

@Table
export default class GstSettings extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    gstSettingsID: number;

    @Column(DataType.STRING)
    userID: string;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.BOOLEAN)
    isRegistered: Boolean;

    @Column(DataType.INTEGER)
    accountingBasic: number;

    @Column(DataType.INTEGER)
    reportingFrequency: number;

    @Column(DataType.INTEGER)
    gstOption: number;

    @Column(DataType.INTEGER)
    basLodgement: number;

    @Column(DataType.DATE)
    annualReportDate: Date;

    @Column(DataType.INTEGER)
    selectedGstOption: number;

    @Column(DataType.INTEGER)
    selectedBasLodgement: number;

}