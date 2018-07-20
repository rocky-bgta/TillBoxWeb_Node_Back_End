/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/10/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import ResponseMessage from "../responseMessage";
//import BllExceptionLog from "../../bllManager/startUp/exceptionLogBll";
import {Inject} from "typescript-ioc";
import ExceptionLogModel from "../../models/startUp/exceptionLogModel";
import * as _ from 'lodash';
import Util from "../../utils/utils";
import Core from "./core";
import BaseDao from "./baseDao";
import {transactionQueryBuilder} from "../global/appEvent";
import {QueryType} from "../enum/enums";
import ExceptionLogBll from "../../bllManager/startUp/exceptionLogBll";
import RequestClientData from "../global/RequestClientData";
import {clientData} from "../../middlewares/filter";

export default abstract class BaseFacade extends Core {
    private responseMessage: ResponseMessage;

    clientData: RequestClientData = clientData;

    @Inject
    private exceptionLogBll: ExceptionLogBll;

    private executeTransaction: ExecuteTransaction = new ExecuteTransaction();

    constructor() {
        super();
    }

    public async endTransaction() {

        let result;
        try {
            transactionQueryBuilder.end();
            let buildQuery: string = transactionQueryBuilder.getBuildQuery();
            //this.executeTransaction = new ExecuteTransaction();
            result = await this.executeTransaction.executeRawQuery(buildQuery, QueryType.Insert);
            await this.destroyTransaction();
        } catch (err) {
            throw err;
        }
        return result;
    }

    public async getJournalReferenceNo() {
        let result = null, sequenceSql = 'SELECT nextval(\'journalReferenceNo\');';
        try {
            result = await this.executeTransaction.executeRawQuery(sequenceSql, QueryType.SequenceGenerator);
            if (result != null)
                return result;
            else null
        } catch (err) {
            throw err;
        }
    }


    async exceptionLogSave(serviceName: string,
                           requestObject: any,
                           errorObject: any,
                           priority: number = 1,
                           isSolved: boolean = false) {

        try {
            Util.logger('save ExceptionLog from base Facade');
            let exceptionLogModel: ExceptionLogModel = new ExceptionLogModel();

            exceptionLogModel.priority = priority;
            exceptionLogModel.date = new Date();

            if (clientData != null) {
                exceptionLogModel.pageName = clientData.pageName;
                exceptionLogModel.module = _.toString(clientData.moduleID);
                exceptionLogModel.userID = clientData.userID;
            }

            exceptionLogModel.service = serviceName;
            exceptionLogModel.requestObject = JSON.stringify(requestObject);
            exceptionLogModel.message = errorObject.message;
            exceptionLogModel.messageTrace = JSON.stringify(errorObject);
            exceptionLogModel.isSolved = isSolved;


            await this.exceptionLogBll.save(exceptionLogModel);
            return;

        } catch (err) {
            Util.logger('ExceptionLog from base Facade', err);
        }
        return;

    }


    getResponseMessBuilder(message: string, requestObject: any, code: any, token: any = null, businessID: any = 0): ResponseMessage {
        this.responseMessage = new ResponseMessage();
        this.responseMessage.setMessage(message);
        this.responseMessage.setResponseObject(requestObject);
        this.responseMessage.setResponseCode(code);

        if (clientData != null && businessID == 0) {
            this.responseMessage.setBusinessID(clientData.businessID);
        } else {
            this.responseMessage.setBusinessID(businessID);
        }

        if (token == null && clientData != null) {
            this.responseMessage.setToken(clientData.token);
        } else {
            this.responseMessage.setToken(token);
        }
        return this.responseMessage;
    }

}

// create class to execute transaction
export class ExecuteTransaction extends BaseDao {
    constructor() {
        super();
    }
}