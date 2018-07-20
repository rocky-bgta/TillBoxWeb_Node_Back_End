import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class Country extends BaseEntity {


    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    countryID: number;

    @Column(DataType.STRING)
    countryCode: string;

    @Column(DataType.STRING)
    name: string;
}