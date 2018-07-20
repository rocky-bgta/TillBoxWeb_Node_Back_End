import BaseEntity from "../../core/abstractClass/baseEntity";
import {AutoIncrement, Column, DataType, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class Role extends BaseEntity {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    roleID: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

}