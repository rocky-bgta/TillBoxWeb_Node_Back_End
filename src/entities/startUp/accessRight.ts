import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class AccessRight extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    accessRightID: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;
}