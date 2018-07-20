/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 14-Nov-17
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
import * as startUpBLL from "../../bllManager/startUp/index";
import {clientData} from "../../middlewares/filter";
import * as startUpModels from "../../models/startUp";
import {Status} from "../../core/enum/enums";

export default class JournalFacade extends BaseFacade {

    @Inject
    journalBll: BLL.journal;

    @Inject
    financialYearBll: startUpBLL.financialYear;

    constructor() {
        super();
    }

    private journalModels: Models.journal[];

    async saveOrUpdateJournal(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        this.journalModels = <Models.journal[]> reqMessage.requestObj;
        let debitAmount: number = 0, creditAmount: number = 0;
        let journalReferenceNo: number = null;
        let businessID: number = reqMessage.businessID;
        let currentFinancialYearModel: startUpModels.financialYear = null;
        let financialYearID: number = null;

        try {

            if (this.lodash.isNumber(businessID) && businessID == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

            //first check financial year ===============================================================
            currentFinancialYearModel = await this.financialYearBll.getCurrentFinancialYear(businessID);
            if (this.lodash.isEmpty(currentFinancialYearModel)) {
                responseMessage = this.getResponseMessBuilder(Message.FINANCIAL_YEAR_DOES_NOT_EXIST_FOR_THIS_BUSINESS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }
            //==========================================================================================

            if (this.lodash.isArray(this.journalModels)) {

                for (let journalModel of this.journalModels) {
                    if (journalModel.drCrIndicator == Enum.DebitCreditIndicator.Debit) {
                        debitAmount += journalModel.amount;
                    }
                    if (journalModel.drCrIndicator == Enum.DebitCreditIndicator.Credit) {
                        creditAmount += journalModel.amount;
                    }
                }

                let period = this.financialYearBll.getPeriodOfCurrentFinancialYear(currentFinancialYearModel);  //Utils.getCurrentPeriod(startDate, endDate, currentDate);
                financialYearID = currentFinancialYearModel.financialYearID;
                journalReferenceNo = await this.getJournalReferenceNo();
                if (debitAmount === creditAmount) {

                    for (let i = 0; i < this.journalModels.length; i++) {
                        this.journalModels[i].journalReferenceNo = journalReferenceNo;
                        this.journalModels[i].period = period;
                        this.journalModels[i].financialYearID = financialYearID;
                        this.journalModels[i].status = Status.Active;
                        if (clientData != null) {
                            this.journalModels[i].createdBy = this.clientData.userID;
                            this.journalModels[i].updatedBy = this.clientData.userID;
                        }
                        delete this.journalModels[i].journalID;
                    }
                    result = await this.journalBll.bulkSave(this.journalModels);
                    responseMessage = this.getResponseMessBuilder(Message.SAVE_JOURNAL_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.DEBIT_CREDIT_AMOUNT_NOT_EQUAL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }
        } catch (err) {
            Utils.logger('financialYear facade error ');
            if (result == null) {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_JOURNAL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('saveOrUpdateJournal facade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    /* public async getJournal(reqMessage: RequestMessage) {
         let responseMessage: ResponseMessage;
         Utils.logger('get all Journal from facade ');
         let result;
         await this.journalBll.getReferenceNo();
         try {
             result = await this.journalBll.getAll();
             if (result) {
                 responseMessage = this.getResponseMessBuilder(Message.GET_JOURNAL_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
             } else {
                 responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_JOURNAL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
             }
         } catch (err) {
             Utils.logger('get Journal error ');
             responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_JOURNAL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
             await this.exceptionLogSave('getJournalFacade', reqMessage.requestObj, err);
         }
         return responseMessage;
     }*/
}