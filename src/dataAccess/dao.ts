import Util, {default as Utils} from '../utils/utils';
import BaseDao from "../core/abstractClass/baseDao";
import Core from "../core/abstractClass/core";
import {appEvent} from "../core/global/appEvent";
import * as _ from 'lodash';
import {setting} from "../setting/setting";
import {Status} from "../core/enum/enums";

const {Pool} = require('pg');

export default class Dao extends BaseDao {
    private entity: any;

    constructor(entity: any) {
        super();
        this.entity = entity;
    }

    public async save(object: any) {
        let saveEntity: any = null, nonPersistentInstance=null, transactionEvent = '';
        let primaryKey: number =null;
        if (appEvent != null) {
            transactionEvent = appEvent.transactionState;
        }

        try {

            nonPersistentInstance = this.entity.Model;
            //nonPersistentInstance.primaryKeyField=null;
            //primaryKey = await this.getPrimaryKeyForTransaction();

            //nonPersistentInstance.primaryKeyField = this.getPrimaryKeySequence();
            //saveEntity = nonPersistentInstance.build(object);


            if (transactionEvent == "Active") {
                if(nonPersistentInstance.name!='User')
                    primaryKey = await this.getPrimaryKeyForTransaction();
                saveEntity = nonPersistentInstance.build(object);
                if(primaryKey!=null)
                    saveEntity[nonPersistentInstance.primaryKeyField] = primaryKey;

                if(saveEntity!=null) {
                    saveEntity = saveEntity.dataValues;
                    nonPersistentInstance=null;
                }

                return saveEntity;

            } else {
                //if(nonPersistentInstance.name!='User')
                //    nonPersistentInstance.primaryKeyField = this.getPrimaryKeySequence();
                saveEntity = nonPersistentInstance.build(object);
                await saveEntity
                    .save()
                    .then((row: any) => {
                        //console.info('save entity ' + JSON.stringify(saveEntity));
                        return saveEntity=row;
                        // you can now access the currently saved task with the variable anotherTask... nice!
                    })
                    .catch((err: any) => {
                        return err;
                        // Ooops, do some error-handling
                        //console.error("Problem in save");
                    });

                if (saveEntity != null) {
                    saveEntity = saveEntity.dataValues;
                    nonPersistentInstance=null;
                }

                return saveEntity;
            }


            /*  if (saveEntity[nonPersistentInstance.primaryKeyField] == null)
                  saveEntity[nonPersistentInstance.primaryKeyField] = undefined;*/


            /* else
             if(nonPersistentInstance.hasPrimaryKeys==true)
                 saveEntity = saveEntity.dataValues;
             else
                 saveEntity[nonPersistentInstance.primaryKeyField] = undefined;*/
            // return saveEntity;
            //}

            /*
                 await sequelize.transaction(async (t) => {
                     await this.entity.create(object, {transaction: t}).then((row: any) => {
                         saveEntity = row;
                         return;
                     }).catch((err: any) => {
                         t.rollback();
                         Util.logger('save Dao Failed', err);
                         return;
                     });
                 });*/


            /* Utils.logger("Dao save object", object);
             saveEntity = new this.entity(object);
             await saveEntity.save().then((row: any) => {
                 Utils.logger('save Dao Success', row);
                 saveEntity = row;
                 return;
             }).catch((err: any) => {
                 Utils.logger('save Dao Failed', err);
                 saveEntity = null;
                 return;
             });*/
        } catch (err) {
            Util.logger('save Dao Error Log', err);
            throw err;
        }
         /*finally {
            nonPersistentInstance.primaryKeyField=null;
                }*/
        //return saveEntity;
    }

    public async getAll(orderBy?: any) {
        Util.logger("Dao getAll function get executed");
        let returnRows: any = new Array<any>();
        try {

            if (orderBy != null) {
                await this.entity.findAll({
                    where: {status:Status.Active},
                    order: [orderBy]
                }).then((rows: any) => {
                    if (rows != null) {
                        for (let row of rows) {
                            returnRows.push(row.dataValues);
                        }
                    }
                    return returnRows;
                }).catch((err: any) => {
                    return returnRows = err;
                });

            } else {
                await this.entity.findAll({
                    where: {status:Status.Active}
                }).then((rows: any) => {
                    if (rows != null) {
                        for (let row of rows) {
                            returnRows.push(row.dataValues);
                        }
                    }
                    return returnRows;
                }).catch((err: any) => {
                    return returnRows = err;
                });
            }
        } catch (err) {
            Util.logger('getAll Dao Error Log', err);
            throw err;
        }
        /*finally {

               }*/
        return returnRows;
    }

    public async getAllByCondition(whereClause: object, orderBy?: any) {
        let resultRows: any = new Array<any>();
        try {
            if (orderBy != null) {
                await this.entity.findAll({
                    where: whereClause,
                    order: [orderBy]
                }).then((rows: any) => {
                    if (rows != null) {
                        for (let row of rows) {
                            resultRows.push(row.dataValues);
                        }
                    }
                    return resultRows;
                }).catch((err: any) => {
                    return resultRows = err;
                });
            } else {
                await this.entity.findAll({
                    where: whereClause
                }).then((rows: any) => {
                    if (rows != null) {
                        for (let row of rows) {
                            resultRows.push(row.dataValues);
                        }
                    }
                    return resultRows;
                }).catch((err: any) => {
                    return resultRows = err;
                });
            }
        } catch (err) {
            Utils.logger("Dao findAllByOneCondition Error", err);
            throw err;
        }
        return resultRows;
    }

    public async getOneByCondition(whereCondition: object) {
        let resultRow: any = null;
        try {
            await this.entity.findOne({
                where: whereCondition
            }).then((row: any) => {
                if (row != null)
                    return resultRow = row.dataValues;
            }).catch((err: any) => {
                return resultRow = err;
            });
        } catch (err) {
            Utils.logger("Dao getOneByCondition Error:  ", err);
            throw err;
        }
        /*finally {

               }*/
        return resultRow;
    }

    public async updateByCondition(model: object, whereCondition: object): Promise<any> {
        let result: any = null;
        try {
            result = await this.entity.update(
                model,
                {
                    where: whereCondition
                }
            ).then((success: any) => {
                Util.logger("Update success", success);
                return result = success;
            }).catch((err: any): any => {
                Util.logger("Update Failed", err);
                return result = err;
            });
        } catch (err) {
            Utils.logger("Dao updateByCondition Error ", err);
            throw err;
        }
        /*finally {

               }*/
        return result;
    }

    public async deleteByCondition(whereObject: Object) {
        let result: any = null;
        try {
            await this.entity.destroy({
                where: whereObject
            }).then((deleteCount: any) => {
                return result = deleteCount;
            }).catch((err: any) => {
                return result = err;
            });
        } catch (err) {
            Util.logger("Dao delete by condition ", err);
            throw err;
        }
        return result;
    }
/*
    public async getPrimaryKeyOfTable() {
        let nonPersistentInstance = this.entity.Model;
        let primaryKey = nonPersistentInstance.primaryKeyAttribute;
        let resultRow: number;
        let queryResult: any = null;
        try {
            await this.entity.findAll({
                attributes: [primaryKey],
                order: '"' + primaryKey + '"' + ' DESC',
                limit: 1
            }).then((row: any) => {
                if (!_.isEmpty(row))
                    return queryResult = row[0].dataValues[primaryKey];
            }).catch((err: any) => {
                return queryResult = err;
            });
        } catch (err) {
            Utils.logger("Dao getPrimaryKeyOfTable Error:  ", err);
            throw err;
        } finally {
            if (_.isNumber(queryResult)) {
                //&& queryResult.original.column !=undefined
                resultRow = _.toInteger(queryResult);
                resultRow++;
            } else {
                resultRow = 1;
            }
        }
        return resultRow;
    }*/

   /* private getPrimaryKeySequence() {
        let nonPersistentInstance = this.entity.Model;
        let result: string = null;
        let tableName: string = null, primaryKeyField: string = null, sequenceSql: string = null;
        //let nextSequence: any = null;
        try {

            tableName = nonPersistentInstance.name;
            primaryKeyField = nonPersistentInstance.primaryKeyField;
            sequenceSql = "SELECT nextval(" + "'\"" + tableName + "_" + primaryKeyField + "_seq" + "\"'::regClass" + ")";
            console.info(sequenceSql);
            /!*
                        nextSequence = await this.executeRawQuery(sequenceSql, QueryType.Select);
                        if (nextSequence != null) {
                            result = this.lodash.toNumber(nextSequence[0].nextval)
                        }*!/
            result = sequenceSql;

        } catch (err) {
            Utils.logger("Dao getPrimaryKeyOfTable Error:  ", err);
            throw err;
        }
        return result;
    }*/

    private async getPrimaryKeyForTransaction() {


        let nonPersistentInstance = this.entity.Model;
        let result: any = null;
        let tableName: string = null, primaryKeyField: string = null, sql: string = null;
        //let connectionConfig = nonPersistentInstance.modelManager.sequelize.config;
        let connectionString = setting.DB_CONN_STRING;
        try {

            tableName = nonPersistentInstance.name;
            primaryKeyField = nonPersistentInstance.primaryKeyField;
            sql = "SELECT nextval(" + "'\"" + tableName + "_" + primaryKeyField + "_seq" + "\"'::regClass" + ")";

            //let dbUrl: string = connectionConfig;

                //'postgresql://postgres:abcd123!@10.200.10.151:5432/TillboxWeb111';
            //const connectionString = dbUrl;
            const pool = new Pool({
                connectionString: connectionString,

            });

            await pool.connect().then(async (client: any) => {

                await client.query(sql).then((res: any, err: any) => {
                    //console.log(res, err);
                    //console.info(res.rows[0].nextval);
                    result = res.rows[0].nextval;
                    client.release();
                }).catch((erro:any) => {
                    client.release();
                    Utils.logger('query error', erro.message);
                });

            });
            if (result != null)
                result = _.toInteger(result)

        } catch (err) {
            Utils.logger("Dao getPrimaryKeyOfTable Error:  ", err);
            throw err;
        }
        return result;
    }

    public async bulkSave(models: Array<object>) {
        let result: any = null;
        let nonPersistentInstance = this.entity.Model;
        await nonPersistentInstance.bulkCreate(models)
            .then((models: any) => {
                return result = models;
            }).catch((err: any) => {
                return result = err;
            });
        return result;
    }

    public async transaction(model: any, operationType: number, whereCondition?: object) {
        let tableName = this.entity.tableName;
        Core.getEventEmitter().emit('buildQuery', model, tableName, operationType, whereCondition);
    }
}