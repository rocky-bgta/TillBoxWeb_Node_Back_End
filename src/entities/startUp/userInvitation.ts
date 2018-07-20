/**
 *Author: Ayasha Siddiqua
 *Date: 10/10/17
 *Time: 10:37 AM
 */

import {Column, DataType, Table} from "sequelize-typescript";
import BaseEntity from "../../core/abstractClass/baseEntity";

@Table
export default class UserInvitation extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    userInvitationEntityID: number;

    @Column(DataType.STRING)
    userID: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.STRING)
    token: string;

    @Column(DataType.INTEGER)
    businessID: number;

    @Column(DataType.INTEGER)
    accessRightID: number;

    @Column(DataType.DATE)
    expireDate: Date;

    @Column(DataType.BOOLEAN)
    done: boolean
}