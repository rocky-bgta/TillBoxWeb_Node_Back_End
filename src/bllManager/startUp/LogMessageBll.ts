/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/17/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import Dao from "../../dataAccess/dao";
//import LogMessageModel from "../../models/startUp/logMessageModel";
//import Util from "../../utils/utils";
import * as Entities from "../../entities/startUp/index";
import {Singleton} from "typescript-ioc";

@Singleton
export default class LogMessageBll {
    private dao: Dao;

    constructor() {
        this.dao = new Dao(Entities.logMessage);
    }

    public async getAllLogMessage() {
        return await this.dao.getAll();
    }

   /* public async saveLogMessage(userID: string = null, moduleID: number = 0, formName: string = null,
                                calledFunction: string = null, actionID: number = 0, userRightID: number = 0,
                                logMessage: string = null, isObject: boolean = false, logTypeID: number = 0,
                                sessionID: number = 0) {
        try {
            let logMessageModel: LogMessageModel = new LogMessageModel();
            logMessageModel.userID = userID;
            logMessageModel.moduleID = moduleID;
            logMessageModel.formName = formName;
            logMessageModel.calledFunction = calledFunction;
            logMessageModel.actionID = actionID;
            logMessageModel.userRightID = userRightID;
            logMessageModel.userTypeID = 0;
            logMessageModel.logMessage = logMessage;
            logMessageModel.isObject = isObject;
            logMessageModel.logTypeID = logTypeID;
            logMessageModel.sessionID = sessionID;

            return await this.dao.save(logMessageModel);
        } catch (err) {
            Util.logger('save log message in bll_log_message :: ', err);
            throw err;
        }
    }*/

    /*public async getLogMessage(userID: string = null, moduleID: number = null, formName: string = null,
                               sessionID: number = null, actionID: number = null) {
        try {
            let whereCondition: any;
            if (userID != null && userID.length > 0) {
                whereCondition.userID = userID;
            }
            if (moduleID != null && moduleID > 0) {
                whereCondition.moduleID = moduleID;
            }
            if (formName != null && formName.length > 0) {
                whereCondition.formName = formName;
            }
            if (sessionID != null && sessionID >> 0) {
                whereCondition.sessionID = sessionID;
            }
            if (actionID != null && actionID > 0) {
                whereCondition.actionID = actionID;
            }

            return await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Util.logger('get log message bll_log_message :: ', err);
            throw err;
        }
    }*/
}