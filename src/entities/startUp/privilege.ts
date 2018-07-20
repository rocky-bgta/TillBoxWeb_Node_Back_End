import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table, Unique} from "sequelize-typescript";

@Table
export default class Privilege extends BaseEntity {
    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    privilegeID: number;

    @Column(DataType.INTEGER)
    parentID: number;

    @Column(DataType.STRING)
    actionCode: string;

    @Unique
    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    showName: string;
}