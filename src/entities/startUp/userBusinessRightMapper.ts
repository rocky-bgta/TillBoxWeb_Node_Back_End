import BaseEntity from "../../core/abstractClass/baseEntity";
import {AutoIncrement, Column, DataType, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class UserBusinessRightMapper extends BaseEntity {


    @PrimaryKey
    @AutoIncrement
    @Column
    userBusinessRightMapperID: number;

    @Column({type: DataType.STRING, unique: 'compositeUnique'})
    userID: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column({type: DataType.INTEGER, unique: 'compositeUnique'})
    businessID: number;

    @Column(DataType.INTEGER)
    accessRightID: number;

    @Column(DataType.INTEGER)
    status: number;


}