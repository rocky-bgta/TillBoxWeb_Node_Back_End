import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, IsEmail, Table} from "sequelize-typescript";

@Table
export default class BusinessContact extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    businessContactID: number;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @IsEmail
    @Column(DataType.STRING)
    email: string;

    @Column(DataType.STRING)
    phone: string;

    @Column(DataType.BOOLEAN)
    primaryContact: boolean;
}