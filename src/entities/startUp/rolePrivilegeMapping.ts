import BaseEntity from "../../core/abstractClass/baseEntity";
import {Column, DataType, Table} from "sequelize-typescript";

@Table
export default class RolePrivilegeMapping extends BaseEntity {

    @Column({primaryKey: true, autoIncrement: true})
    @Column(DataType.INTEGER)
    rolePrivilegeMappingID: number;

    @Column(DataType.INTEGER)
    roleID: number;

    @Column(DataType.INTEGER)
    privilegeID: number;

}