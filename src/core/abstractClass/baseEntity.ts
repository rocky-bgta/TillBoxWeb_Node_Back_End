import {Column, CreatedAt, DataType, Model, UpdatedAt} from 'sequelize-typescript';

export default abstract class BaseEntity extends Model<any> {
    @CreatedAt
    createdDate: Date;

    @UpdatedAt
    updatedDate: Date;

    @Column(DataType.STRING)
    createdBy: string;

    @Column(DataType.STRING)
    updatedBy: string;

    @Column(DataType.INTEGER)
    status: number;

}