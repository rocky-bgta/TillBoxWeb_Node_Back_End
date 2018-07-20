/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/16/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import Core from "./core";
import Utils from "../../utils/utils";
import Dao from "../../dataAccess/dao";
import {QueryType, Status} from "../enum/enums";
import {appEvent} from "../global/appEvent";
import * as util from "util";
import {clientData} from "../../middlewares/filter";

const sleep = util.promisify(setTimeout);

export default abstract class BaseBll extends Core {

    public dao: Dao;

    constructor() {
        super();
    }

    public async save(model: any, logMessage?: string) {
        let result, transactionEvent: string = '', nonPersistentModel: object;
        try {
            Utils.logger(logMessage + " from bll");
            if (clientData != null) {
                model.createdBy = clientData.userID;
                model.updatedBy = clientData.userID;
            }
            model.createdDate = new Date();
            model.updatedDate = new Date();
            model.status = Status.Active;

            if (appEvent != null) {
                transactionEvent = appEvent.transactionState;
                await sleep(100);
            }

            result = await this.dao.save(model);
            if (transactionEvent == "Active") {
                nonPersistentModel = result;
                await this.dao.transaction(nonPersistentModel, QueryType.Insert);
                return result;
            }
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async updateByCondition(model: any, whereCondition: any, logMessage?: string) {
        let result, transactionEvent: string = '';
        Utils.logger(logMessage + " from bll");
        try {
            if (clientData != null)
                model.updatedBy = clientData.userID;
            model.updatedDate = new Date();

            if (appEvent != null) {
                transactionEvent = appEvent.transactionState;
                if (transactionEvent == "Active") {
                    await this.dao.transaction(model, QueryType.Update, whereCondition);
                    return;
                }
            }

            if (appEvent != null) {
                await sleep(100);
            }


            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }


    public async deactivateRow(model: any, whereCondition: any, logMessage?: string) {
        let result, transactionEvent: string = '';
        model.status = Status.Inactive;
        Utils.logger(logMessage + " from bll");
        try {
            if (clientData != null)
                model.updatedBy = clientData.userID;
            model.updatedDate = new Date();

            if (appEvent != null) {
                transactionEvent = appEvent.transactionState;
                if (transactionEvent == "Active") {
                    await this.dao.transaction(model, QueryType.Update, whereCondition);
                    return;
                }
            }

            if (appEvent != null) {
                await sleep(100);
            }

            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async deleteByCondition(whereCondition: any, logMessage?: string) {
        let result;
        Utils.logger(logMessage + " from bll");
        try {
            if (appEvent != null) {
                await sleep(100);
            }
            result = await this.dao.deleteByCondition(whereCondition);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async getAll(logMessage?: string) {
        let result;
        try {
            Utils.logger(logMessage + " from bll");
            if (appEvent != null) {
                await sleep(100);
            }
            result = await this.dao.getAll();
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async getAllByCondition(whereCondition: any, logMessage?: string) {
        let result;
        Utils.logger(logMessage + " from bll");
        try {
            if (appEvent != null) {
                await sleep(100);
            }
            whereCondition.status = Status.Active;
            result = await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async getOneByCondition(whereCondition: any, logMessage?: string) {
        let result;
        Utils.logger(logMessage + " from bll");
        try {
            if (appEvent != null) {
                await sleep(100);
            }
            whereCondition.status = Status.Active;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async bulkSave(models: Array<any>, logMessage?: string) {
        let result;
        try {
            Utils.logger(logMessage + " from bll");

            /*if(clientData != null) {
                for (let i = 0; i < models.length; i++) {
                    models[i].createdBy = clientData.userID;
                    models[i].updatedBy = clientData.userID;
                }
            }*/

            if (appEvent != null) {
                await sleep(100);
            }

            result = await this.dao.bulkSave(models);

        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    /*

            public async getPrimaryKey() {
                let result;
                try {
                    if (appEvent != null) {
                        await sleep(100);
                    }
                    result = await this.dao.getPrimaryKeyOfTable();

                } catch (err) {
                    Utils.logger('Error Log', err);
                    throw err;
                }
                return result;
            }
        */

    public async rawQueryForTransaction(model: any, logMessage?: string) {
        let transactionEvent: string = '';
        try {

            if (appEvent != null) {
                transactionEvent = appEvent.transactionState;
                await sleep(100);
            }

            if (transactionEvent == "Active") {
                await this.dao.transaction(model, QueryType.Raw);
            } else {
                throw Error
            }

        } catch (err) {
            Utils.logger('Transaction not active', err);
            throw err;
        }

    }

}