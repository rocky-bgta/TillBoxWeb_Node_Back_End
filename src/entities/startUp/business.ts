import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class Business extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.STRING)
    businessDBName: string;

    @Column(DataType.STRING)
    serialNo: string;

    @Column(DataType.INTEGER)
    productTypeID: number;

    @Column(DataType.STRING)
    businessName: string;

    @Column(DataType.INTEGER)
    businessTypeID: number;

    @Column(DataType.STRING)
    phone: string;

    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.INTEGER)
    subscriptionStatus: number;

    @Column(DataType.STRING)
    owner: string;

}