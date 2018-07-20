import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class User extends BaseEntity {

    @Column({primaryKey: true})
    @Column({type: DataType.STRING, unique: true})
    userID: string;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    surname: string;

    @Column(DataType.STRING)
    cellPhone: string;

    @Column(DataType.STRING)
    password: string;
}