import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class Session extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    sessionID: number;

    @Column(DataType.STRING)
    businessDBName: string;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.STRING)
    userID: string;

    @Column(DataType.STRING(300))
    token: string;

    @Column(DataType.DATE)
    start: Date;

    @Column(DataType.DATE)
    end: Date;

    @Column(DataType.INTEGER)
    duration: number;

    @Column(DataType.INTEGER)
    loginStatus: number;

    @Column(DataType.STRING(300))
    refreshToken: string;
}