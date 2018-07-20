import BaseEntity from "../../core/abstractClass/baseEntity";
import {AutoIncrement, Column, DataType, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class AccessRightRoleMapping extends BaseEntity {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    accessRightRoleMappingID: number;

    @Column(DataType.INTEGER)
    accessRightID: number;

    @Column(DataType.INTEGER)
    roleID: number;

}