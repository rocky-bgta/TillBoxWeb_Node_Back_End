/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 14-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Inject} from 'typescript-ioc';
import ResponseMessage from '../../core/responseMessage';
import RequestMessage from '../../core/requestMessage';
import Utils from '../../utils/utils';
import {Message} from '../../core/messageConstant/accounting';
import * as Models from '../../models/accounting';
import * as startUpModels from "../../models/startUp/index"
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as BLL from "../../bllManager/accounting";
import * as startUpBLL from "../../bllManager/startUp/index";
import {MessageConstant} from "../../core/messageConstant";
import {clientData} from "../../middlewares/filter";
import {AccountBudgetDetail} from "../../models/accounting/VMbudgetDetail";

export default class BudgetFacade extends BaseFacade {

    @Inject
    private accountBll: BLL.account;

    @Inject
    private accountTypeBll: BLL.accountType;

    @Inject
    private financialYearBll: startUpBLL.financialYear;

    @Inject
    private budgetBll: BLL.budget;

    @Inject
    private budgetDetailBll: BLL.budgetDetail;

    private accountModels: Models.account[];
    private accountTypeModels: Models.accountType[];
    private accountTypeModel: Models.accountType;

    private financialYearModels: startUpModels.financialYear[];

    private budgetModel: Models.budget;
    private budgetDetails: Models.budgetDetail[];
    private VMbudgetDetails: Models.VMbudgetDetail;

    private supportingAccountBudgetDetailModel: AccountBudgetDetail;
    private supportingAccountBudgetDetailModels: AccountBudgetDetail[];


    private VMbudgetDropDownList: Models.VMbudgetDropDownList;

    constructor() {
        super();
    }

    async getBudgetDropDownList(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let whereCondition = this.customObject;
        let businessID = reqMessage.businessID;
        let result = null;

        if (clientData.token != null) {
            Utils.logger('getBudgetDropDownList method from facade');
            try {
                this.VMbudgetDropDownList = new Models.VMbudgetDropDownList();

                whereCondition.businessID = businessID;

                this.accountTypeModels = await this.accountTypeBll.getAll("get all accountType");
                this.financialYearModels = await this.financialYearBll.getAllByCondition(whereCondition, "get all financial year by businessID");


                if (this.accountTypeModels != null && this.financialYearModels != null) {

                    // update VM
                    this.VMbudgetDropDownList.accountTypeList = this.accountTypeModels;
                    this.VMbudgetDropDownList.financialYearList = this.financialYearModels;

                    result = this.VMbudgetDropDownList;

                    //build response
                    responseMessage = this.getResponseMessBuilder(Message.GET_ALL_DROP_DOWN_LIST_FOR_BUDGET_SUCCESSFULLY,
                        result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_DROP_DOWN_LIST_FOR_BUDGET,
                        reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }

            } catch (err) {
                Utils.logger('Error Log', err);
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_DROP_DOWN_LIST_FOR_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                await this.exceptionLogSave('getAccountDropDownList', reqMessage.requestObj, err);
            }
        } else {
            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
        }
        return responseMessage;
    }

    async getBudgetDetail(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        let accountTypeID: number = reqMessage.requestObj.accountTypeID;
        let financialYearID: number = reqMessage.requestObj.financialYearID;

        let businessID: number = reqMessage.businessID; //clientDataExport.businessID;

        let whereCondition = this.customObject;
        if (clientData.token != null) {
            Utils.logger('getAccountList method from facade');
            try {

                whereCondition.accountTypeID = accountTypeID;
                this.accountTypeModel = await this.accountTypeBll.getOneByCondition(whereCondition);

                whereCondition = new Object();
                whereCondition.businessID = businessID;
                whereCondition.accountTypeID = this.accountTypeModel.accountTypeID;
                whereCondition.accountClassificationID = this.accountTypeModel.accountClassificationID;

                this.accountModels = await this.accountBll.getAllByCondition(whereCondition);

                whereCondition = new Object();
                whereCondition.financialYearID = financialYearID;
                whereCondition.businessID = businessID;


                this.budgetModel = await this.budgetBll.getOneByCondition(whereCondition);

                //let budgetDetailsArray = new Array<any>();
                this.supportingAccountBudgetDetailModels = new Array<AccountBudgetDetail>()
                this.VMbudgetDetails = new Models.VMbudgetDetail();
                let budgetID = this.budgetModel.budgetID;

                for (let account of this.accountModels) {
                    //for(let budget of this.budgetModels){
                    whereCondition = new Object();
                    whereCondition.accountID = account.accountID;
                    whereCondition.budgetID = budgetID;
                    //whereCondition.accountTypeID = this.accountTypeModel.accountTypeID;

                    this.budgetDetails = await this.budgetDetailBll.getAllByCondition(whereCondition);

                    this.supportingAccountBudgetDetailModel = new AccountBudgetDetail();

                    //this.VMbudgetDetails = new Models.VMbudgetDetail();

                    //if(this.budgetDetails.length>0) {
                    this.supportingAccountBudgetDetailModel.account = account;
                    this.supportingAccountBudgetDetailModel.budgetDetail = this.budgetDetails;
                    this.supportingAccountBudgetDetailModels.push(this.supportingAccountBudgetDetailModel);
                    //}
                    //this.VMbudgetDetails.account= account;

                    //this.VMbudgetDetails.budget = budget;

                    //this.VMbudgetDetails.budgetDetail = this.budgetDetails;
                    //this.VMbudgetDetails.accountBudgetDetail = this.supportingAccountBudgetDetailModel;

                    //budgetDetailsArray.push(this.VMbudgetDetails);
                    //}
                }

                this.VMbudgetDetails.budget = this.budgetModel;
                this.VMbudgetDetails.accountBudgetDetail = this.supportingAccountBudgetDetailModels;

                if (this.supportingAccountBudgetDetailModels.length > 0) {
                    result = this.VMbudgetDetails;
                    responseMessage = this.getResponseMessBuilder(Message.GET_ALL_BUDGET_DETAILS_SUCCESSFULLY,
                        result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_BUDGET_DETAILS,
                        reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }

            } catch (err) {
                Utils.logger('Error Log', err);
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                await this.exceptionLogSave('getAccountList', reqMessage.requestObj, err);
            }
        } else {
            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
        }
        return responseMessage;
    }

    async saveOrUpdateBudgetDetail(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        let whereCondition = this.customObject;

        this.VMbudgetDetails = reqMessage.requestObj;
        this.supportingAccountBudgetDetailModels = new Array<AccountBudgetDetail>();
        this.supportingAccountBudgetDetailModels = this.VMbudgetDetails.accountBudgetDetail;

        let budgetDetails = null;//= new Array<Models.budgetDetail>()

        if (clientData.token != null) {
            Utils.logger('getAccountList method from facade');
            try {

                for (let item of this.supportingAccountBudgetDetailModels) {
                    budgetDetails = item.budgetDetail;
                    for (let details of budgetDetails) {
                        if (details.budgetDetailID == 0) {
                            delete details.budgetDetailID;
                            await this.budgetDetailBll.save(details);
                        } else {
                            whereCondition = new Object();
                            whereCondition.budgetDetailID = details.budgetDetailID;
                            await this.budgetDetailBll.updateByCondition(details, whereCondition);
                        }
                    }
                }

                result = "Success";
                responseMessage = this.getResponseMessBuilder(Message.OPERATION_SUCCESSFUL,
                    result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

            } catch (err) {
                Utils.logger('Error Log', err);
                responseMessage = this.getResponseMessBuilder(Message.OPERATION_FAILED, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                await this.exceptionLogSave('saveOrUpdateBudgetDetail', reqMessage.requestObj, err);
            }
        } else {
            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
        }
        return responseMessage;
    }
}