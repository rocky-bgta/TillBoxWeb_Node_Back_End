import {AllowNull, Column, DataType, IsEmail, Table, Unique} from 'sequelize-typescript';
import BaseEntity from "../../core/abstractClass/baseEntity";


@Table
export default class CustomerEntity extends BaseEntity {

    @Column({primaryKey: true, autoIncrement:true})
    @Column(DataType.BIGINT)
    id: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    phone: string;

    @IsEmail
    @Unique
    @AllowNull(false)
    @Column(DataType.TEXT)
    email: string

}
