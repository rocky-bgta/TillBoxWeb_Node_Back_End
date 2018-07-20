/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/10/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import Core from "../abstractClass/core";
import TransactionQueryBuilder from "../../dataAccess/TransactionQueryBuilder";

let appEvent: AppEvent=null;
let transactionQueryBuilder: TransactionQueryBuilder;

export default class AppEvent {
    constructor() {
    }

    transactionState: string = null;

    setTransactionState() {
        this.transactionState = "Active";
    }
}

async function transactionStartEvent() {
    appEvent = new AppEvent();
    appEvent.setTransactionState();
    transactionQueryBuilder = new TransactionQueryBuilder();
    transactionQueryBuilder.being();
}

async function destroyTransactionEvent() {
    transactionQueryBuilder = null;
    appEvent.transactionState = null;
}

async function tranQueryBuildEvent(model: any, tableName: string, operationType: number, whereCondition?: object) {
    await transactionQueryBuilder.buildQuery(model, tableName, operationType, whereCondition);
}

Core.getEventEmitter().on('startTransaction', async () => {
    await transactionStartEvent();
});

Core.getEventEmitter().on('buildQuery', async (model: any, tableName: string, operationType: number, whereCondition?: object) => {
    await tranQueryBuildEvent(model, tableName, operationType, whereCondition);
});

Core.getEventEmitter().on('destroyTransaction', async () => {
    await destroyTransactionEvent();
});

export {appEvent, transactionQueryBuilder}

