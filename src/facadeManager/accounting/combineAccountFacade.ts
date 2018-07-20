/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 15-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseFacade from "../../core/abstractClass/baseFacade";
import {Inject} from "typescript-ioc";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import Utils from "../../utils/utils";
import * as BLL from "../../bllManager/accounting";
import {Message} from "../../core/messageConstant/accounting";
import {MessageConstant} from "../../core/messageConstant";
import * as Models from '../../models/accounting';
import * as startUpModels from "../../models/startUp";
import * as Enum from "../../core/enum/accounting/enums";
import * as startUpBLL from "../../bllManager/startUp";
//import {Status} from "../../core/enum/enums";

export default class CombineAccountFacade extends BaseFacade {

    @Inject
    combineAccountBll: BLL.combineAccount;

    @Inject
    accountBll: BLL.account;

    @Inject
    journalBll: BLL.journal;

    @Inject
    financialYearBll: startUpBLL.financialYear;

    @Inject
    moneyTransferBll: BLL.moneyTransfer;

    constructor() {
        super();
    }

    private combineAccountModel: Models.combineAccount;

    async saveOrUpdateCombineAccount(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        let whereCondition = this.customObject;
        let businessID = reqMessage.businessID;
        let createdCombineAccountModel: Models.combineAccount = null, updateCombineAccountModel: any = null;
        let givenCombineAccountModel: Models.combineAccount = null;
        let currentFinancialYearModel: startUpModels.financialYear = null;
        this.combineAccountModel = <Models.combineAccount> reqMessage.requestObj;
        let accountClassificationID: number = null, accountTypeID: number = null;
        let accountToModel: Models.account = null, accountFromModel: Models.account = null;
        let availableBalanceOfFromAccount: number = null;
        //TODO: attach security check
        let combineAccountID: number = this.combineAccountModel.combineAccountID;

        givenCombineAccountModel = this.combineAccountModel;

        if (this.lodash.isNumber(businessID) && businessID == 0) {
            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            return responseMessage;
        }



        //check same account  (account must be different)
        if (this.combineAccountModel.accountIDTo == this.combineAccountModel.accountIDFrom) {
            responseMessage = this.getResponseMessBuilder(Message.ACCOUNT_MUST_BE_DIFFERENT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            return responseMessage;
        } else {
            whereCondition = new Object();
            whereCondition.accountID = this.combineAccountModel.accountIDTo;
            accountToModel = await this.accountBll.getOneByCondition(whereCondition);

            whereCondition = new Object();
            whereCondition.accountID = await this.combineAccountModel.accountIDFrom;
            accountFromModel = await this.accountBll.getOneByCondition(whereCondition);


            if(accountFromModel.isDefault){
                responseMessage = this.getResponseMessBuilder(Message.YOUR_CAN_NOT_MODIFY_DEFAULT_ACCOUNT_, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

            //check account type (account must be same type)
            if (accountToModel == null || accountFromModel == null) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

            if (accountToModel.accountTypeID != accountFromModel.accountTypeID) {
                responseMessage = this.getResponseMessBuilder(Message.ACCOUNT_TYPE_MUST_BE_SAME, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }
        }

        try {
            //first check financial year ===============================================================================
            currentFinancialYearModel = await this.financialYearBll.getCurrentFinancialYear(businessID);
            if (this.lodash.isEmpty(currentFinancialYearModel)) {
                responseMessage = this.getResponseMessBuilder(Message.FINANCIAL_YEAR_DOES_NOT_EXIST_FOR_COMBINED_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }
            //==========================================================================================================

            if (this.lodash.isNumber(combineAccountID) && combineAccountID == 0) {
                //save combinedAccountModel ========================
                let docNumber = Utils.generateUniqueID();
                this.combineAccountModel.docNumber = docNumber;
                this.combineAccountModel.businessID = businessID;
                //==================================================

                // ========== Transaction start =======================================
                //await this.startTransaction();

                whereCondition = new Object();
                whereCondition.accountID = await this.combineAccountModel.accountIDFrom;
                accountFromModel = await this.accountBll.getOneByCondition(whereCondition);

                availableBalanceOfFromAccount = await this.moneyTransferBll.getAvailableBalanceByAccountID(
                    accountFromModel.accountID,
                    accountFromModel.accountTypeID,
                    businessID
                );

                //update amount
                this.combineAccountModel.amount = availableBalanceOfFromAccount;
                delete this.combineAccountModel.combineAccountID;

                createdCombineAccountModel = await this.combineAccountBll.save(this.combineAccountModel);

                //Deactivate from account===============================================
                await this.accountBll.deactivateRow(accountFromModel, whereCondition);
                //=======================================================================


                // ================ Journal Table Entry Start ==========================

                let parentEntry: Models.journal, childEntry: Models.journal;
                let journalReferenceNo: number = null;
                journalReferenceNo = await this.getJournalReferenceNo();
                if (journalReferenceNo != null)
                    journalReferenceNo = this.lodash.toInteger(journalReferenceNo);

                accountClassificationID = accountFromModel.accountClassificationID;
                accountTypeID = accountFromModel.accountTypeID;


                let period = this.financialYearBll.getPeriodOfCurrentFinancialYear(currentFinancialYearModel);  //Utils.getCurrentPeriod(startDate, endDate, currentDate);

                parentEntry = await this.journalBll.getEntryForInsert(
                    accountClassificationID,
                    accountTypeID,
                    true,
                    accountFromModel.accountID,
                    businessID,
                    currentFinancialYearModel.financialYearID,
                    period,
                    journalReferenceNo,
                    createdCombineAccountModel.amount,
                    createdCombineAccountModel.date,
                    createdCombineAccountModel.combineAccountID,
                    Enum.ReferenceType.CombineAccount,
                    createdCombineAccountModel.note
                );

                childEntry = await this.journalBll.getEntryForInsert(
                    accountClassificationID,
                    accountTypeID,
                    false,
                    accountToModel.accountID,
                    businessID,
                    currentFinancialYearModel.financialYearID,
                    period,
                    journalReferenceNo,
                    createdCombineAccountModel.amount,
                    createdCombineAccountModel.date,
                    createdCombineAccountModel.combineAccountID,
                    Enum.ReferenceType.CombineAccount,
                    createdCombineAccountModel.note
                );


                // TODO: Need to tag reference ID (ReplaceAccount)

                let dEntry = await this.journalBll.save(parentEntry, 'journal entry');
                let cEntry = await this.journalBll.save(childEntry, 'journal entry');

                if (createdCombineAccountModel != null &&
                    dEntry != null &&
                    cEntry != null
                ) {
                    result = createdCombineAccountModel;
                    responseMessage = this.getResponseMessBuilder(Message.SAVE_COMBINE_ACCOUNT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_COMBINE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }


                //============= Journal Table Entry End =================================

                //result = await this.endTransaction();

                //============== Transaction end ========================================


            } else {
                //update combine Account

                if (this.lodash.isNumber(combineAccountID) && combineAccountID > 0) {

                    whereCondition = new Object();
                    whereCondition.combineAccountID = this.combineAccountModel.combineAccountID;
                    //TODO: check given and previous account model
                    updateCombineAccountModel = await this.combineAccountBll.updateByCondition(this.combineAccountModel, whereCondition);

                    let fromAccountID: number = this.combineAccountModel.accountIDFrom;
                    let toAccountID: number = this.combineAccountModel.accountIDTo;
                    let accountArray = new Array<number>();
                    accountArray.push(toAccountID); // credit account
                    accountArray.push(fromAccountID);// debit account

                    result = await this.journalBll.updateJournalEntry(
                        businessID,
                        Enum.ReferenceType.CombineAccount,
                        givenCombineAccountModel.combineAccountID,
                        givenCombineAccountModel.amount,
                        accountArray
                    );

                    if (result != null && updateCombineAccountModel != null) {
                        responseMessage = this.getResponseMessBuilder(Message.UPDATE_COMBINE_ACCOUNT_SUCCESSFULLY, givenCombineAccountModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_COMBINE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }

                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }
            }
        } catch (err) {
            Utils.logger('saveOrUpdateCombineAccount facade error ');
            if (combineAccountID == 0) {
                responseMessage = this.getResponseMessBuilder(Message.SAVE_COMBINE_ACCOUNT_SUCCESSFULLY, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_COMBINE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            //await this.destroyTransaction();
            await this.exceptionLogSave('saveOrUpdateCombineAccount facade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getCombineAccount(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        Utils.logger('get all CombineAccount from facade ');
        let result = null;
        try {
            result = await this.combineAccountBll.getAll();
            if (result) {
                responseMessage = this.getResponseMessBuilder(Message.GET_COMBINE_ACCOUNT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_COMBINE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('get Combine Account ');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_COMBINE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getCombineAccount', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    //TODO:
    public async replaceAccounts(reqMessage: RequestMessage) {

        /* let responseMessage: ResponseMessage;
         Utils.logger('get all CombineAccount from facade ');
         let result;
         try {
             result = await this.combineAccountBll.getAll();
             if (result) {
                 responseMessage = this.getResponseMessBuilder(Message.GET_COMBINE_ACCOUNT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
             } else {
                 responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_COMBINE_ACCOUNT, reqMessage, MessageConstant.FAILED_ERROR_CODE);
             }
         } catch (err) {
             Utils.logger('get Combine Account ');
             responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_COMBINE_ACCOUNT, reqMessage, MessageConstant.FAILED_ERROR_CODE);
             await this.exceptionLogSave('getCombineAccount', reqMessage, err);
         }
         return responseMessage;*/
    }
}