/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/9/17
 *Time: 5:48 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseFacade from "../../core/abstractClass/baseFacade";
import RequestMessage from "../../core/requestMessage";
import {Inject} from "typescript-ioc";
import * as BLL from "../../bllManager/accounting";
import {MessageConstant} from "../../core/messageConstant";
import {Message} from "../../core/messageConstant/accounting";
import ResponseMessage from "../../core/responseMessage";
import Utils from "../../utils/utils";
import TaxCodeModel from "../../models/accounting/taxCodeModel";
import {TaxType} from "../../core/enum/accounting/enums";
import * as startupBLL from "../../bllManager/startUp";

export default class TaxCodeFacade extends BaseFacade {

    @Inject
    taxCodeBll: BLL.taxCode;

    @Inject
    businessBll: startupBLL.business;

    constructor() {
        super();
    }

    async saveOrUpdateTaxCode(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        let givenTaxCodeModel: TaxCodeModel = reqMessage.requestObj;
        let whereCondition = this.customObject;
        let taxCodeID: number = givenTaxCodeModel.taxCodeID;

        try {
            let isValidBusinessId = await this.businessBll.isValidBusinessID(reqMessage.businessID);
            Utils.logger('isValidBusinessId result ', isValidBusinessId);
            if (isValidBusinessId) {
                if (this.lodash.isNumber(taxCodeID) && taxCodeID == 0) {
                    //save
                    Utils.logger('taxCode save from taxCodeFacade ');
                    delete givenTaxCodeModel.taxCodeID;
                    result = await this.taxCodeBll.save(givenTaxCodeModel, 'save taxCode');

                    if (result != null) {
                        responseMessage = this.getResponseMessBuilder(Message.SAVE_TAX_CODE_SUCCESSFULLY, givenTaxCodeModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_TAX_CODE, givenTaxCodeModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    //update
                    if (this.lodash.isNumber(taxCodeID) && taxCodeID > 0) {
                        Utils.logger('taxCode update from taxCodeFacade ');

                        let isValidTaxCodeID;
                        isValidTaxCodeID = await this.taxCodeBll.isValidTaxCodeID(taxCodeID);
                        if (isValidTaxCodeID) {
                            whereCondition = new Object();
                            whereCondition.taxCodeID = givenTaxCodeModel.taxCodeID;
                            result = await this.taxCodeBll.updateByCondition(givenTaxCodeModel, whereCondition, 'update taxCode');

                            if (this.lodash.isArray(result)) {
                                if (result[0] > 0) {
                                    responseMessage = this.getResponseMessBuilder(Message.UPDATE_TAX_CODE_SUCCESSFULLY, givenTaxCodeModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                                } else {
                                    responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CHANGE_FOUND_IN_UPDATE, givenTaxCodeModel, MessageConstant.NO_CONTENT_CODE, null, reqMessage.businessID);
                                }
                            } else {
                                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_TAX_CODE, givenTaxCodeModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                            }
                        } else {
                            Utils.logger('Not a valid taxCodeID ', isValidTaxCodeID);
                            responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                            return responseMessage;
                        }
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                        return responseMessage;
                    }
                }
            } else {
                //Invalid businessID
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_BUSINESSID, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                return responseMessage;
            }
        } catch (err) {
            Utils.logger('taxCode facade error');
            if (taxCodeID == 0) {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_TAX_CODE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_TAX_CODE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('taxCode Facade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getTaxTypeList(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        Utils.logger('get all taxType from taxCode facade');
        let result = null;
        try {
            result = Utils.getKeyValueFromEnum(TaxType);
            Utils.logger('tax type ', result);
            if (result) {
                responseMessage = this.getResponseMessBuilder(Message.GET_TAX_TYPE_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_TAX_TYPE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('get Tax Type ', err);
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_TAX_TYPE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('taxCodeFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    public async getTaxCode(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        Utils.logger('get all taxCodeBll from taxCodeBll facade ');
        let result = null;
        try {
            result = await this.taxCodeBll.getAll("get all tax code");
            if (result) {
                responseMessage = this.getResponseMessBuilder(Message.GET_TAX_CODE_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_TAX_CODE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('get taxCodeBll List error ', err);
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_TAX_CODE, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('taxCodeFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}