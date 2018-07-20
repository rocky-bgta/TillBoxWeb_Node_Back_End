import {Column, DataType, Table} from 'sequelize-typescript';


@Table
export default class ErrorLog {

    @Column({primaryKey: true, autoIncrement:true})
    @Column(DataType.INTEGER)
    errorLogID: number;

    @Column(DataType.TEXT)
    controller: string;

    @Column(DataType.TEXT)
    facade: string;

    @Column(DataType.DATE)
    dateTime: Date;

    @Column(DataType.INTEGER)
    priority: number;

    @Column(DataType.TEXT)
    pageName: string;

    @Column(DataType.TEXT)
    service: string;

    @Column(DataType.TEXT)
    module: string;

    @Column(DataType.TEXT)
    userId: string;

    @Column(DataType.TEXT)
    object: string;

    @Column(DataType.TEXT)
    daoAction: string;

    @Column(DataType.TEXT)
    serviceAction: string;

    @Column(DataType.TEXT)
    message: string;

    @Column(DataType.TEXT)
    messageTrace: string
}
