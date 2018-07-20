import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class ForgetPasswordToken extends BaseEntity {

    @Column({primaryKey: true, autoIncrement:true})
    @Column(DataType.INTEGER)
    forgetPasswordTokenID:number;

    @Column(DataType.STRING)
    userID: String;

    @Column(DataType.STRING)
    token: String;

    @Column(DataType.DATE)
    validation: Date;
}