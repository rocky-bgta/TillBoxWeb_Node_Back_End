import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class Address extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    addressID: number;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.INTEGER)
    typeID: number;

    @Column(DataType.STRING)
    address: string;

    @Column(DataType.STRING)
    suburb: string;

    @Column(DataType.STRING)
    state: string;

    @Column(DataType.STRING)
    postCode: string;

    @Column(DataType.INTEGER)
    country: number;
}