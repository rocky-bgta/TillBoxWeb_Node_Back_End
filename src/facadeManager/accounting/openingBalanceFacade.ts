/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 11/20/2017
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
import * as Enum from "../../core/enum/accounting/enums";
//import {clientData} from "../../middlewares/filter";
import * as startUpModels from "../../models/startUp/index"
import * as startUpBLL from "../../bllManager/startUp/index";

export default class OpeningBalanceFacade extends BaseFacade {

    @Inject
    openingBalanceBll: BLL.openingBalance;

    @Inject
    accountBll: BLL.account;

    @Inject
    journalBll: BLL.journal;

    @Inject
    budgetBll: BLL.budget;

    @Inject
    financialYearBll: startUpBLL.financialYear;

    private VMopeningBalance: Models.VMopeningBalance;

    private openingBalanceModel: Models.openingBalance;
    private openingBalanceModels: Models.openingBalance[];
    private accountModel: Models.account;
    //private budgetModel: Models.budget;
    //private financialYearModel: startUpModels.financialYear;

    constructor() {
        super();
    }

    async saveOrUpdate(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        let whereCondition = this.customObject;
        let businessID: number;
        let journalReferenceNo: number = null;
        let currentFinancialYearModel: startUpModels.financialYear = null;
        let createdOpeningBalanceModel: Models.openingBalance = null;
        let updateOpeningBalanceModel: Models.openingBalance = null;
        let VMgivenOpeningBalanceModel: Models.VMopeningBalance = <Models.VMopeningBalance> reqMessage.requestObj;
        businessID = reqMessage.businessID;
        let openingBalanceID: number;

        let historicalBalanceCoa: Models.account;

        this.VMopeningBalance = reqMessage.requestObj;


        this.openingBalanceModel = this.VMopeningBalance.openingBalanceModel;
        this.accountModel = this.VMopeningBalance.accountModel;

        openingBalanceID = this.openingBalanceModel.openingBalanceID;

        try {

            if (this.lodash.isNumber(businessID) && businessID == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

            if(this.accountModel.isDefault){
                responseMessage = this.getResponseMessBuilder(Message.YOUR_CAN_NOT_MODIFY_DEFAULT_ACCOUNT_, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

            whereCondition = new Object();
            whereCondition.accountName = 'Historical Balance';
            historicalBalanceCoa = await this.accountBll.getOneByCondition(whereCondition);

            if (this.lodash.isNumber(openingBalanceID) && openingBalanceID == 0) {

                //first check financial year ===========================================================================
                currentFinancialYearModel = await this.financialYearBll.getCurrentFinancialYear(businessID);
                if (this.lodash.isEmpty(currentFinancialYearModel)) {
                    responseMessage = this.getResponseMessBuilder(Message.FINANCIAL_YEAR_DOES_NOT_EXIST_FOR_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }
                //======================================================================================================

                //save Opening balance
                if (this.accountModel != null)
                    this.openingBalanceModel.accountID = this.accountModel.accountID;
                else {
                    responseMessage = this.getResponseMessBuilder(Message.ACCOUNT_NOT_FOUND_FOR_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }

                this.openingBalanceModel.businessID = businessID;


                this.openingBalanceModel.referenceID = this.accountModel.accountID;
                //TODO: May need to change referenceType
                this.openingBalanceModel.referenceType = Enum.ReferenceType.OpeningBalance;


                // ========== Transaction start =======================================
                //await this.startTransaction();

                delete this.openingBalanceModel.openingBalanceID;
                createdOpeningBalanceModel = await this.openingBalanceBll.save(this.openingBalanceModel);


                // ================ Journal Table Entry Start ==========================
                let parentEntry: Models.journal, childEntry: Models.journal;
                let accountClassificationID: number = null, accountTypeID: number = null;
                accountClassificationID = this.accountModel.accountClassificationID;
                accountTypeID = this.accountModel.accountTypeID;

                journalReferenceNo = await this.getJournalReferenceNo();
                if (journalReferenceNo != null)
                    journalReferenceNo = this.lodash.toInteger(journalReferenceNo);


                let period = this.financialYearBll.getPeriodOfCurrentFinancialYear(currentFinancialYearModel);  //Utils.getCurrentPeriod(startDate, endDate, currentDate);


                parentEntry = await this.journalBll.getEntryForInsert(
                    accountClassificationID,
                    accountTypeID,
                    true,
                    this.accountModel.accountID,
                    businessID,
                    currentFinancialYearModel.financialYearID,
                    period,
                    journalReferenceNo,
                    createdOpeningBalanceModel.amount,
                    createdOpeningBalanceModel.date,
                    createdOpeningBalanceModel.openingBalanceID,
                    Enum.ReferenceType.OpeningBalance,
                    createdOpeningBalanceModel.note
                );


                childEntry = await this.journalBll.getEntryForInsert(
                    accountClassificationID,
                    accountTypeID,
                    false,
                    historicalBalanceCoa.accountID,
                    businessID,
                    currentFinancialYearModel.financialYearID,
                    period,
                    journalReferenceNo,
                    createdOpeningBalanceModel.amount,
                    createdOpeningBalanceModel.date,
                    createdOpeningBalanceModel.openingBalanceID,
                    Enum.ReferenceType.OpeningBalance,
                    createdOpeningBalanceModel.note
                );

                let dEntry = await this.journalBll.save(parentEntry, 'journal entry');
                let cEntry = await this.journalBll.save(childEntry, 'journal entry');

                //============= Journal Table Entry End =================================

                //result = await this.endTransaction();

                //============== Transaction end ========================================


                if (createdOpeningBalanceModel != null &&
                    dEntry != null &&
                    cEntry != null
                ) {
                    result = createdOpeningBalanceModel;
                    responseMessage = this.getResponseMessBuilder(Message.SAVE_OPENING_BALANCE_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }

            } else {
                //update OpeningBalance
                if (this.lodash.isNumber(openingBalanceID) && openingBalanceID > 0) {

                    whereCondition = new Object();
                    whereCondition.openingBalanceID = VMgivenOpeningBalanceModel.openingBalanceModel.openingBalanceID;
                    updateOpeningBalanceModel = await this.openingBalanceBll.updateByCondition(VMgivenOpeningBalanceModel.openingBalanceModel, whereCondition);

                    let openingBalanceAccountID: number = VMgivenOpeningBalanceModel.openingBalanceModel.accountID;
                    let historicalAccountID: number = historicalBalanceCoa.accountID;
                    let accountArray = new Array<number>();
                    accountArray.push(openingBalanceAccountID);  //debit account
                    accountArray.push(historicalAccountID);      //credit account

                    result = await this.journalBll.updateJournalEntry(
                        businessID,
                        Enum.ReferenceType.OpeningBalance,
                        VMgivenOpeningBalanceModel.openingBalanceModel.openingBalanceID,
                        VMgivenOpeningBalanceModel.openingBalanceModel.amount,
                        accountArray
                    );

                    if (result != null && updateOpeningBalanceModel != null) {
                        responseMessage = this.getResponseMessBuilder(Message.UPDATE_OPENING_BALANCE_SUCCESSFULLY, VMgivenOpeningBalanceModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_OPENING_BALANCE, VMgivenOpeningBalanceModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }
            }

        } catch (err) {
            Utils.logger('OpeningBalanceFacade error ');
            if (openingBalanceID == 0) {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_OPENING_BALANCE, VMgivenOpeningBalanceModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_OPENING_BALANCE, VMgivenOpeningBalanceModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            //await this.destroyTransaction();
            await this.exceptionLogSave('saveOrUpdateOpeningBalance facade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getByAccountID(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null, accountID: number;
        accountID = reqMessage.requestObj.accountID;


        let whereCondition = this.customObject;
        let businessID: number;

        businessID = reqMessage.businessID;

        whereCondition.accountID = accountID;
        whereCondition.businessID = businessID;

        this.accountModel = await this.accountBll.getOneByCondition(whereCondition, 'get account');
        this.openingBalanceModel = await this.openingBalanceBll.getOneByCondition(whereCondition, 'get opening balance');

        try {
            if (this.accountModel != null && this.openingBalanceModel != null) {
                //update VM
                this.VMopeningBalance = new Models.VMopeningBalance();
                this.VMopeningBalance.accountModel = this.accountModel;
                this.VMopeningBalance.openingBalanceModel = this.openingBalanceModel;
                result = this.VMopeningBalance;

                responseMessage = this.getResponseMessBuilder(Message.GET_OPENING_BALANCE_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }

        } catch (err) {
            Utils.logger('getOpeningBalanceByAccountID error ');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getOpeningBalanceByAccountID', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getOpeningBalanceByBusinessID(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null, businessID: number;
        businessID = reqMessage.businessID;

        let whereCondition = this.customObject;
        whereCondition.businessID = businessID;

        this.openingBalanceModels = await this.openingBalanceBll.getAllByCondition(whereCondition, 'get opening balance by businessID');

        try {
            if (this.openingBalanceModels != null) {
                result = this.openingBalanceModels;
                responseMessage = this.getResponseMessBuilder(Message.GET_OPENING_BALANCE_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('getOpeningBalanceByBusinessID error ');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getOpeningBalanceByBusinessID', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}