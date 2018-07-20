/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10-Nov-17
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
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as BLL from "../../bllManager/accounting";
import {MessageConstant} from "../../core/messageConstant";
import {clientData} from "../../middlewares/filter";

export default class AccountFacade extends BaseFacade {

    @Inject
    private accountBll: BLL.account;

    @Inject
    private accountTypeBll: BLL.accountType;

    @Inject
    private taxCodeBll: BLL.taxCode;

    @Inject
    private accountClassificationBll: BLL.accountClassification;

    @Inject
    private cashFlowBll: BLL.cashFlow;

    @Inject
    private openingBalanceBll: BLL.openingBalance;


    private accountModel: Models.account;
    private accountModels: Models.account[];
    private accountTypeModels: Models.accountType[];
    private cashFlowModels: Models.cashFlow[];
    private accountClassificationModels: Models.accountClassification[];
    private taxCodeModels: Models.taxCode[];
    private VMaccountDropDownList: Models.VMaccountDropDownList;

    //private VMaccount: Models.VMaccount;


    constructor() {
        super();
    }

    public async getAccountClassification(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        Utils.logger('get account classification from facade ');
        let result = null;
        try {
            result = await this.accountClassificationBll.getAll('get all account classification');
            Utils.logger('account classification get : result ', result);
            if (result) {
                responseMessage = this.getResponseMessBuilder(Message.GET_ACCOUNT_CLASSIFICATION_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_ACCOUNT_CLASSIFICATION, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }

        } catch (err) {
            Utils.logger('Account classification Error ');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_ACCOUNT_CLASSIFICATION, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('combineAccountFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async getAccountDropDownList(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        let businessID: number = null; //= clientDataExport.businessID;
        let whereCondition = this.customObject;

        if (clientData != null)
            businessID = this.clientData.businessID;
        else
            businessID = reqMessage.businessID;


        if (clientData != null && clientData.token != null) {
            Utils.logger('getAccountDropDownList method from facade');
            try {
                this.VMaccountDropDownList = new Models.VMaccountDropDownList();

                whereCondition = new Object();
                whereCondition.businessID = businessID;

                this.accountModels = await this.accountBll.getAllByCondition(whereCondition, "get all accounts");
                this.accountTypeModels = await this.accountTypeBll.getAll("get all accountType");
                this.taxCodeModels = await this.taxCodeBll.getAll("get all tax code");
                this.cashFlowModels = await this.cashFlowBll.getAll("Cash flow");
                this.accountClassificationModels = await this.accountClassificationBll.getAll("Account Classification");


                if (this.accountModels != null &&
                    this.accountTypeModels != null &&
                    this.taxCodeModels != null &&
                    this.cashFlowModels != null &&
                    this.accountClassificationModels != null) {
                    // update VM
                    this.VMaccountDropDownList.accountList = this.accountModels;
                    this.VMaccountDropDownList.accountTypeList = this.accountTypeModels;
                    this.VMaccountDropDownList.taxCodeList = this.taxCodeModels;
                    this.VMaccountDropDownList.cashFlow = this.cashFlowModels;
                    this.VMaccountDropDownList.accountClassification = this.accountClassificationModels;

                    result = this.VMaccountDropDownList;
                    //build response
                    responseMessage = this.getResponseMessBuilder(Message.GET_ALL_DROP_DOWN_LIST_FOR_ACCOUNT_SUCCESSFULLY,
                        result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_DROP_DOWN_LIST_FOR_ACCOUNT,
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

    async getAccountList(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        let businessID: number = null;// = clientDataExport.businessID;
        let whereCondition = this.customObject;
        if (clientData != null)
            businessID = this.clientData.businessID;
        else
            businessID = reqMessage.businessID;

        if (clientData != null && clientData.token != null) {
            Utils.logger('getAccountList method from facade');
            try {
                whereCondition = new Object();
                whereCondition.businessID = businessID;

                this.accountModels = await this.accountBll.getAllByCondition(whereCondition, "get all account list");

                if (this.accountModels != null) {
                    result = this.accountModels;
                    responseMessage = this.getResponseMessBuilder(Message.GET_ALL_ACCOUNT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_ACCOUNT,
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

    async getParentAccounts(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result: any = new Array<any>(), queryResult: any[];
        //if (this.clientData != null && this.clientData.token != null) {
        Utils.logger('getAccountList method from facade');
        try {
            queryResult = await this.accountBll.getAllParentAccount();
            /* for(let item of queryResult){
                 result.push(item);
             }*/
            if (queryResult != null) {

            }
            result = queryResult;
            responseMessage = this.getResponseMessBuilder(Message.GET_PARENT_ACCOUNT_SUCCESSFULLY, result, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);

        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_PARENT_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getAccountList', reqMessage.requestObj, err);
        }
        // }else {
        //responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
        // }
        return responseMessage;
    }

    async saveOrUpdateAccount(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let accountID, result = null, accountCode = null;
        let whereCondition = this.customObject;
        this.accountModel = reqMessage.requestObj;
        //let validationCheck: boolean;
        let reqObject: Models.account = <Models.account> this.accountModel;
        let businessID: number = reqMessage.businessID;
        let createdAccountModel: Models.account = null;

        /* validationCheck = Utils.isValidModel(Models.account, this.accountModel);

         if (!validationCheck) {
             responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST_MODEL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
             return responseMessage
         }*/


        if(this.accountModel.isDefault){
            responseMessage = this.getResponseMessBuilder(Message.YOUR_CAN_NOT_MODIFY_DEFAULT_ACCOUNT_, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            return responseMessage;
        }


        if (this.lodash.isNumber(businessID) && businessID == 0) {
            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            return responseMessage;
        }

        accountID = this.accountModel.accountID;
        if (this.clientData != null && this.clientData.token != null) {
            try {
                if (this.lodash.isNumber(accountID) && accountID == 0) {
                    //save

                    accountCode = this.accountBll.getAccountCode(this.accountModel);
                    this.accountModel.accountCode = accountCode;

                    //delete this.accountModel.accountID;

                    //set business ID from client data
                    if (clientData != null)
                        this.accountModel.businessID = clientData.businessID;
                    else
                        this.accountModel.businessID = businessID;

                    /* if(this.accountModel.businessID == 0)
                         throw Error;*/

                    let duplicateAccountCode = await this.accountBll.checkDuplicateAccountCode(this.accountModel.accountCode);
                    if (duplicateAccountCode) {
                        responseMessage = this.getResponseMessBuilder(Message.DUPLICATE_ACCOUNT_CODE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    }

                    let duplicateAccount = await this.accountBll.checkDuplicateAccount(this.accountModel);
                    if (duplicateAccount) {
                        responseMessage = this.getResponseMessBuilder(Message.DUPLICATE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    }

                    //this.accountModel.accountID = await this.accountBll.getPrimaryKey();
                    delete this.accountModel.accountID;
                    this.accountModel.isDefault = false;
                    createdAccountModel = await this.accountBll.save(this.accountModel);

                    //result = await this.accountBll.save(this.accountModel);
                    if (createdAccountModel != null && createdAccountModel.accountID != 0) {
                        result = createdAccountModel;
                        responseMessage = this.getResponseMessBuilder(Message.SAVE_ACCOUNT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    } else {
                        responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_ACCOUNT, result, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    }

                } else {
                    //update
                    if (this.lodash.isNumber(accountID) && accountID > 0) {

                        whereCondition = new Object();
                        whereCondition.accountID = accountID;
                        accountCode = this.accountBll.getAccountCode(this.accountModel);
                        this.accountModel.accountCode = accountCode;
                        result = await this.accountBll.updateByCondition(this.accountModel, whereCondition);

                        // Check update condition =============
                        if (this.lodash.isArray(result)) {
                            if (result[0] > 0) {
                                responseMessage = this.getResponseMessBuilder(Message.UPDATE_ACCOUNT_SUCCESSFULLY, reqObject, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                            } else {
                                responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CHANGE_FOUND_IN_UPDATE, reqObject, MessageConstant.NO_CONTENT_CODE, null, reqMessage.businessID);
                            }
                        } else {
                            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_ACCOUNT, result, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        }
                        //======================================

                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    }
                }
            } catch (err) {
                Utils.logger('Error log ', err);
                if (accountID == 0) {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_ACCOUNT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
                await this.exceptionLogSave('saveOrUpdateAccount', reqMessage.requestObj, err);
            }
        } else {
            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
        }
        return responseMessage;
    }

    async getAccountWithOpeningBalance(reqMessage: RequestMessage): Promise<any> {
        let result = null, responseMessage: ResponseMessage = null;
        let businessID = reqMessage.businessID;
        let openingBalanceModels: Models.openingBalance[] = null;
        let whereCondition = this.customObject;
        let accountIDs = null; //= new Array<number>()
        whereCondition.businessID = businessID;
        try {
            this.accountModels = await this.accountBll.getAllByCondition(whereCondition);
            accountIDs = this.lodash.map(this.accountModels, 'accountID');
            whereCondition.accountID = accountIDs;

            openingBalanceModels = await this.openingBalanceBll.getAllByCondition(whereCondition);

            let VM = this.customObject;
            let resultArray = new Array<any>();

            for (let accountModel of this.accountModels) {
                VM = new Object();
                VM.accountModel = accountModel;
                VM.openingBalanceModel = {};

                for (let openingBalance of openingBalanceModels) {

                    if (accountModel.accountID == openingBalance.accountID) {
                        //VM = new Object();
                        //VM.accountModel = accountModel;
                        VM.openingBalanceModel = openingBalance;
                    }
                }
                resultArray.push(VM);
            }

            if (!this.lodash.isEmpty(resultArray)) {
                result = resultArray;
                responseMessage = this.getResponseMessBuilder(Message.GET_ALL_ACCOUNT_WITH_OPENING_BALANCE_SUCCESSFULLY,
                    result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_ACCOUNT_WITH_OPENING_BALANCE,
                    reqMessage.requestObj, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_ACCOUNT_WITH_OPENING_BALANCE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getAccountWithOpeningBalance', reqMessage, err);
        }
        return responseMessage;
    }
}