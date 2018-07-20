/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/13/17
 *Time: 2:40 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseFacade from "../../core/abstractClass/baseFacade";
import {Inject} from "typescript-ioc";
import * as startUpBLL from "../../bllManager/startUp/index";
import ResponseMessage from "../../core/responseMessage";
import {Message} from "../../core/messageConstant/accounting";
import {MessageConstant} from "../../core/messageConstant";
import Utils from "../../utils/utils";
import RequestMessage from "../../core/requestMessage";
import * as Models from "../../models/startUp/index";
import * as BLL from "../../bllManager/accounting/index";
import * as Model from "../../models/accounting/index";
import * as _ from 'lodash';
import {clientData} from "../../middlewares/filter";

export default class FinancialYearFacade extends BaseFacade {

    @Inject
    financialYearBll: startUpBLL.financialYear;

    @Inject
    businessBll: startUpBLL.business;

    @Inject
    journalBll: BLL.journal;

    @Inject
    budgetBll: BLL.budget;

    private financialYearModel: Models.financialYear;

    constructor() {
        super();
    }

    async saveOrUpdateFinancialYear(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null, givenBusinessID, givenFinancialYearID: number, givenFinancialYearName,
            whereCondition = this.customObject;

        this.financialYearModel = <Models.financialYear>reqMessage.requestObj;
        givenFinancialYearID = this.financialYearModel.financialYearID;
        givenFinancialYearName = this.financialYearModel.financialYearName;
        givenBusinessID = reqMessage.businessID;

        let startYear, endYear, startMonth, endMonth;
        startYear = this.financialYearModel.financialYearStart;
        endYear = this.financialYearModel.financialYearEnd;
        startMonth = this.financialYearModel.startMonth;
        endMonth = this.financialYearModel.endMonth;

        let startDate, endDate;
        startDate = Utils.getStartDateFromYearMonth(startYear, startMonth);
        endDate = Utils.getEndDateFromYearMonth(endYear, endMonth);

        try {

            if (this.lodash.isNumber(givenBusinessID) && givenBusinessID == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

            // check businessID validation
            let isValidBusinessID;

            whereCondition = new Object();
            whereCondition.businessID = givenBusinessID;
            isValidBusinessID = await this.businessBll.getOneByCondition(whereCondition, 'getBusinessID');

            if (isValidBusinessID != null) {
                //check whether save or update
                if (this.lodash.isNumber(givenFinancialYearID) && givenFinancialYearID == 0) {
                    //save
                    let isDuplicateFinancialYearName = await this.financialYearBll.checkDuplicateFinancialYearName(givenFinancialYearName, givenBusinessID);
                    Utils.logger('isDuplicateFinancialYearName Result ', isDuplicateFinancialYearName);

                    if (isDuplicateFinancialYearName != null) {
                        Utils.logger('Duplicate FinancialYear Name Found !!! ');
                        responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    } else {
                        //not duplicate, now save
                        if (startDate < endDate) {
                            // can save
                            delete this.financialYearModel.financialYearID;
                            this.financialYearModel.businessID = givenBusinessID;

                            if (clientData != null && clientData.token != null) {
                                this.financialYearModel.createdBy = clientData.userID;
                            }

                            if (this.financialYearModel.isCurrentFinancialYear) {
                                whereCondition = new Object();
                                whereCondition.businessID = givenBusinessID;

                                let financialYearModels = await this.financialYearBll.getAllByCondition(whereCondition, 'getAll financialYear with given businessID');
                                Utils.logger('getAllFinancialYear result', financialYearModels);

                                for (let i = 0; i < financialYearModels.length; i++) {
                                    let model: Models.financialYear = financialYearModels[i];

                                    model.isCurrentFinancialYear = false;
                                    //now update this financialYearModel
                                    whereCondition = new Object();
                                    whereCondition.financialYearID = model.financialYearID;
                                    let updateFinancialYearModel = await this.financialYearBll.updateByCondition(model, whereCondition, 'update financialYearModel');
                                    Utils.logger('updated result of financialYear', updateFinancialYearModel);
                                }
                            }
                            this.financialYearModel = await this.financialYearBll.save(this.financialYearModel, 'save financialYearModel');

                            let addOnBudget;
                            let budgetModel: Model.budget;

                            budgetModel = new Model.budget();
                            budgetModel.businessID = givenBusinessID;
                            if (clientData != null && clientData.token != null) {
                                budgetModel.createdBy = clientData.userID;
                            }
                            budgetModel.financialYearID = this.financialYearModel.financialYearID;
                            addOnBudget = await this.budgetBll.save(budgetModel, 'Save On BudgetModel');
                            Utils.logger('Updated Budget Successfully', addOnBudget);
                            responseMessage = this.getResponseMessBuilder(Message.SAVE_FINANCIAL_YEAR_SUCCESSFULLY, this.financialYearModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                            return responseMessage;
                        } else {
                            //can not save
                            Utils.logger('Can Not Save FinancialYear');
                            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                            return responseMessage;
                        }
                    }
                } else {
                    //update
                    if (this.lodash.isNumber(givenFinancialYearID) && givenFinancialYearID > 0) {

                        // 1. isValid FinancialYearID
                        let isUpdateAbleModel: boolean = false;

                        let isValidFinancialYearID = await this.financialYearBll.isValidFinancialYearID(givenFinancialYearID);
                        Utils.logger('isValidFinancialYearID Result ', isValidFinancialYearID);

                        if (isValidFinancialYearID) {

                            // 2. check whether duplicate financialYearName exist

                            let isDuplicateNameExist = await this.financialYearBll.checkDuplicateFinancialYearName(givenFinancialYearName, givenBusinessID);
                            Utils.logger('isDuplicateNameExist Result ', isDuplicateNameExist);

                            if (isDuplicateNameExist != null) {
                                //found duplicate , check whether ID same
                                if (isDuplicateNameExist.financialYearID != givenFinancialYearID) {
                                    Utils.logger('Duplicate FinancialYearName Found !!!!!!  Can Not Update This FinancialYear ');
                                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                                    return responseMessage;
                                } else {
                                    isUpdateAbleModel = true;
                                }
                            } else {
                                isUpdateAbleModel = true;
                            }
                            if (isUpdateAbleModel) {
                                let getJournalByFinancialYearID = await this.journalBll.getFinancialYearFromJournal(givenFinancialYearID, startDate, endDate);

                                Utils.logger('getJournalByFinancialYearID Result', getJournalByFinancialYearID);

                                let isEditableFinancialYearID = _.isEmpty(getJournalByFinancialYearID);
                                if (!isEditableFinancialYearID) {
                                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                                    return responseMessage;
                                } else {
                                    whereCondition = new Object();
                                    whereCondition.financialYearID = givenFinancialYearID;

                                    if (clientData != null && clientData.token != null) {
                                        this.financialYearModel.updatedBy = clientData.userID;
                                    }
                                    result = await this.financialYearBll.updateByCondition(this.financialYearModel, whereCondition, 'Update FinancialYear');
                                    if (this.lodash.isArray(result)) {
                                        if (result[0] > 0) {
                                            responseMessage = this.getResponseMessBuilder(Message.UPDATE_FINANCIAL_YEAR_SUCCESSFULLY, reqMessage.requestObj, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                                        } else {
                                            responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CHANGE_FOUND_IN_UPDATE, reqMessage.requestObj, MessageConstant.NO_CONTENT_CODE, null, reqMessage.businessID);
                                        }
                                    } else {
                                        responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                                    }
                                    return responseMessage;
                                }
                            } else {
                                Utils.logger('Can Not Update FinancialYear');
                                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                                return responseMessage;
                            }
                        } else {
                            Utils.logger('Not a Valid FinancialYearID ');
                            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                            return responseMessage;
                        }
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    }
                }

            } else {
                Utils.logger('Invalid BusinessID');
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_BUSINESSID, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }

        } catch (err) {
            Utils.logger('financialYear facade error ', err);
            if (givenFinancialYearID == 0) {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('financialYear facade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getFinancialYear(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        Utils.logger('Get All FinancialYear From Facade ');
        let result = null;
        try {
            whereCondition.businessID = reqMessage.businessID;
            result = await this.financialYearBll.getAllByCondition(whereCondition, 'getAll financialYear');//getAll('getAll financialYear');
            responseMessage = this.getResponseMessBuilder(Message.GET_FINANCIAL_YEAR_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('get financial year error');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('financialYearFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }


    public async getCurrentAndFutureFinancialYear(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        let result = null, currentYear, businessId = reqMessage.businessID;
        currentYear = (new Date()).getFullYear();

        try {
            //check businessID validation
            whereCondition = new Object();
            whereCondition.businessID = businessId;
            let isValidBusinessID = await this.businessBll.getOneByCondition(whereCondition, 'isValidBusinessID');
            Utils.logger('isValidBusinessID result ', isValidBusinessID);

            if (isValidBusinessID != null) {
                Utils.logger('Valid BusinessID');
                //getAll where currentYear >= startYear
                result = await this.financialYearBll.getCurrentAndFutureFinancialYear(currentYear, businessId);

                responseMessage = this.getResponseMessBuilder(Message.GET_CURRENT_FINANCIAL_YEAR_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                Utils.logger('Invalid BusinessID');
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_BUSINESSID, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('get current financial year error');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_CURRENT_FINANCIAL_YEAR, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('financialYearFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}