/**
 *Created By: Md. Abdul Hannan
 *Created Date: 11/13/17
 *Time: 2:40 PM
 *Modified By: Md. Nazmus Salahin Rocky
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseFacade from "../../core/abstractClass/baseFacade";
import {Inject} from "typescript-ioc";
import * as BLL from "../../bllManager/accounting";
import ResponseMessage from "../../core/responseMessage";
import {Message} from "../../core/messageConstant/accounting";
import {MessageConstant} from "../../core/messageConstant";
import Utils from "../../utils/utils";
import RequestMessage from "../../core/requestMessage";
import MoneyTransferModel from '../../models/accounting/moneyTransferModel';
import * as Models from '../../models/accounting';
//import {clientData} from "../../middlewares/filter";
import * as Enum from "../../core/enum/accounting/enums";
import * as startUpModels from "../../models/startUp/index";
import * as startUpBLL from "../../bllManager/startUp/index";

export default class MoneyTransferFacade extends BaseFacade {

    @Inject
    moneyTransferBll: BLL.moneyTransfer;

    @Inject
    accountBll: BLL.account;

    @Inject
    financialYearBll: startUpBLL.financialYear;

    @Inject
    journalBll: BLL.journal;

    //@Inject
    //openingBalanceBll: BLL.journal;


    //moneyTransferModel: Models.moneyTransfer;

    //journalModel: Models.journal;

    constructor() {
        super();
    }

    async saveOrUpdateMoneyTransfer(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let businessID = reqMessage.businessID;
        let result = null;
        let givenMoneyTransferModel: Models.moneyTransfer = <MoneyTransferModel> reqMessage.requestObj;
        let whereCondition = this.customObject;
        let availableBalanceOfFromAccount: number = null;
        let accountFromModel: Models.account = null;
        let accountToModel: Models.account = null;
        let currentFinancialYearModel: startUpModels.financialYear = null;

        let createdMoneyTransferModel: Models.moneyTransfer = null;
        let updatedMoneyTransferModel: Models.moneyTransfer = null;
        let accountClassificationID: number = null, accountTypeID: number = null;
        let moneyTransferID: number = givenMoneyTransferModel.moneyTransferID;

        try {
            //TODO: attach security check

            if (this.lodash.isNumber(businessID) && businessID == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }


            //Check that same account not selected
            if (givenMoneyTransferModel.accountIDFrom != givenMoneyTransferModel.accountIDTo) {

                //check account type (account must be same type)
                whereCondition = new Object();
                whereCondition.accountID = givenMoneyTransferModel.accountIDFrom;
                accountFromModel = await this.accountBll.getOneByCondition(whereCondition);

                if(accountFromModel.isDefault){
                    responseMessage = this.getResponseMessBuilder(Message.YOUR_CAN_NOT_MODIFY_DEFAULT_ACCOUNT_, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }

                whereCondition = new Object();
                whereCondition.accountID = givenMoneyTransferModel.accountIDTo;
                accountToModel = await this.accountBll.getOneByCondition(whereCondition);

                //check same account type and account type is Asset
                if (accountFromModel.accountTypeID == accountToModel.accountTypeID
                    && accountFromModel.accountTypeID == Enum.AccountType.CurrentAsset) {

                    availableBalanceOfFromAccount = await this.moneyTransferBll.getAvailableBalanceByAccountID(accountFromModel.accountID, Enum.AccountClassification.Asset, businessID);
                    if (availableBalanceOfFromAccount < givenMoneyTransferModel.amount) {
                        //Insufficient available balance
                        responseMessage = this.getResponseMessBuilder(Message.INSUFFICIENT_AVAILABLE_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;

                    } else if (availableBalanceOfFromAccount >= givenMoneyTransferModel.amount) {

                        accountClassificationID = accountFromModel.accountClassificationID;
                        accountTypeID = accountFromModel.accountTypeID;

                        // start save code ====================
                        if (this.lodash.isNumber(moneyTransferID) && moneyTransferID == 0) {


                            //first check financial year ===============================================================
                            currentFinancialYearModel = await this.financialYearBll.getCurrentFinancialYear(businessID);
                            if (this.lodash.isEmpty(currentFinancialYearModel)) {
                                responseMessage = this.getResponseMessBuilder(Message.FINANCIAL_YEAR_DOES_NOT_EXIST_FOR_MONEY_TRANSFER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                                return responseMessage;
                            }
                            //==========================================================================================


                            //save givenMoneyTransferModel=====================================
                            let docNumber = Utils.generateUniqueID();
                            givenMoneyTransferModel.docNumber = docNumber;
                            // ================================================================

                            // ========== Transaction start =======================================
                            //await this.startTransaction();

                            delete givenMoneyTransferModel.moneyTransferID;
                            createdMoneyTransferModel = await this.moneyTransferBll.save(givenMoneyTransferModel, 'save money transfer');


                            // ================ Journal Table Entry Start ==========================
                            let parentEntry: Models.journal, childEntry: Models.journal;
                            let journalReferenceNo: number = null;
                            journalReferenceNo = await this.getJournalReferenceNo();
                            if (journalReferenceNo != null)
                                journalReferenceNo = this.lodash.toInteger(journalReferenceNo);


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
                                createdMoneyTransferModel.amount,
                                createdMoneyTransferModel.date,
                                createdMoneyTransferModel.moneyTransferID,
                                Enum.ReferenceType.MoneyTransfer,
                                createdMoneyTransferModel.note
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
                                createdMoneyTransferModel.amount,
                                createdMoneyTransferModel.date,
                                createdMoneyTransferModel.moneyTransferID,
                                Enum.ReferenceType.MoneyTransfer,
                                createdMoneyTransferModel.note
                            );

                            let dEntry = await this.journalBll.save(parentEntry, 'journal entry');
                            let cEntry = await this.journalBll.save(childEntry, 'journal entry');


                            //============= Journal Table Entry End =================================

                            //result = await this.endTransaction();

                            //============== Transaction end ========================================

                            if (createdMoneyTransferModel != null &&
                                dEntry != null &&
                                cEntry != null
                            ) {
                                result = createdMoneyTransferModel;
                                responseMessage = this.getResponseMessBuilder(Message.SAVE_MONEY_TRANSFER_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                            } else {
                                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_MONEY_TRANSFER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                            }

                        } else {
                            // Update MoneyTransfer
                            if (this.lodash.isNumber(moneyTransferID) && moneyTransferID > 0) {

                                whereCondition = new Object();
                                whereCondition.moneyTransferID = givenMoneyTransferModel.moneyTransferID;
                                //TODO: check given and previous account model
                                updatedMoneyTransferModel = await this.moneyTransferBll.updateByCondition(givenMoneyTransferModel, whereCondition, 'update money transfer ');

                                let fromAccountID: number = givenMoneyTransferModel.accountIDFrom;
                                let toAccountID: number = givenMoneyTransferModel.accountIDTo;
                                let accountArray = new Array<number>();
                                accountArray.push(fromAccountID);
                                accountArray.push(toAccountID);
                                result = await this.journalBll.updateJournalEntry(
                                    businessID,
                                    Enum.ReferenceType.MoneyTransfer,
                                    givenMoneyTransferModel.moneyTransferID,
                                    givenMoneyTransferModel.amount,
                                    accountArray
                                );
                                if (result != null && updatedMoneyTransferModel != null) {
                                    responseMessage = this.getResponseMessBuilder(Message.UPDATE_MONEY_TRANSFER_SUCCESSFULLY, givenMoneyTransferModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                                } else
                                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_MONEY_TRANSFER, givenMoneyTransferModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                            } else {
                                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                                return responseMessage;
                            }
                        }
                    }
                }
                else {
                    responseMessage = this.getResponseMessBuilder(Message.ACCOUNT_TYPE_MUST_BE_SAME, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }
            }
            else {
                responseMessage = this.getResponseMessBuilder(Message.ACCOUNT_MUST_BE_DIFFERENT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }
        } catch (err) {
            Utils.logger('MoneyTransfer facade error ');
            if (moneyTransferID == 0) {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_MONEY_TRANSFER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_MONEY_TRANSFER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            //await this.destroyTransaction();
            await this.exceptionLogSave('MoneyTransfer Facade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getAllMoneyTransfer(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        Utils.logger('get all money transfer from facade ');
        let result = null;
        try {
            result = await this.moneyTransferBll.getAll();
            if (result != null) {
                responseMessage = this.getResponseMessBuilder(Message.GET_MONEY_TRANSFER_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_MONEY_TRANSFER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('get money transfer  error ');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_MONEY_TRANSFER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('moneyTransferFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getAvailableBalanceByAccountID(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let givenAccount: Models.account = null, accountType: number = null;
        let result = null;
        let businessID: number = reqMessage.businessID;
        try {
            givenAccount = reqMessage.requestObj;
            //accountType = givenAccount.accountTypeID;

            if (givenAccount.accountTypeID == Enum.AccountType.CurrentAsset)
                accountType = Enum.AccountType.CurrentAsset;

            /* if(givenAccount.accountClassificationID == Enum.AccountClassification.Liability)
                 accountType = Enum.AccountClassification.Liability;*/

            result = await this.moneyTransferBll.getAvailableBalanceByAccountID(givenAccount.accountID, accountType, businessID);
            if (result != null) {
                responseMessage = this.getResponseMessBuilder(Message.GET_AVAILABLE_BALANCE_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_AVAILABLE_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_AVAILABLE_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getAvailableBalanceByAccountID', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}