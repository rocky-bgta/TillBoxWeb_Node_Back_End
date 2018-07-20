/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/4/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/

import {Inject} from "typescript-ioc";
import ResponseMessage from "../../core/responseMessage";
import RequestMessage from "../../core/requestMessage";
import {MessageConstant} from "../../core/messageConstant";
import Util from "../../utils/utils";
import EnumGstSetting from "../../core/enum/EnumGstSetting";
import BaseFacade from "../../core/abstractClass/baseFacade";

import * as BLL from "../../bllManager/startUp";
import * as Models from "../../models/startUp"

export default class GstSettingsFacade extends BaseFacade {
    @Inject
    sessionBll: BLL.session;

    @Inject
    gstSettingsBll: BLL.gstSetting;

    @Inject
    gstOptionBll: BLL.gstOption;

    @Inject
    basLodgementOptionBLL: BLL.basLodgementOption;

    @Inject
    resMessage: ResponseMessage;

    constructor() {
        super();
    }


    async getGstSettings(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            whereCondition = new Object();
            whereCondition.token = reqMessage.token;

            let sessionModel: Models.session = await this.sessionBll.getOneByCondition(whereCondition, 'session details');
            if (sessionModel != null && reqMessage.businessID != null) {

                whereCondition = new Object();
                whereCondition.businessID = reqMessage.businessID;

                let gstSettingModel: Models.gstSetting = await this.gstSettingsBll.getOneByCondition(whereCondition, 'gst settingModel');
                Util.logger('settingModel ', gstSettingModel);

                if (gstSettingModel != null) {
                    let gstSettingsViewModel: Models.gstSettingView = new Models.gstSettingView();
                    gstSettingsViewModel.userID = gstSettingModel.userID;
                    gstSettingsViewModel.isRegistered = gstSettingModel.isRegistered;
                    gstSettingsViewModel.reportingFrequency = gstSettingModel.reportingFrequency;
                    gstSettingsViewModel.accountingBasic = gstSettingModel.accountingBasic;
                    gstSettingsViewModel.annualReportingDate = gstSettingModel.annualReportDate;
                    gstSettingsViewModel.selectedBasLodgement = gstSettingModel.selectedBasLodgement;
                    gstSettingsViewModel.selectedGstOption = gstSettingModel.selectedGstOption;
                    gstSettingsViewModel.accountingOption = EnumGstSetting.getAccountingOptions();
                    gstSettingsViewModel.reportingOption = EnumGstSetting.getReportingFrequencyOption();

                    //let gstOptionService = new BllGstOption();
                    gstSettingsViewModel.gstOption = await this.gstOptionBll.getAll('getAll');

                    //let basLodgementOptionService = new BllBasLodgementOption();
                    gstSettingsViewModel.basLodgementOption = await this.basLodgementOptionBLL.getAll('getAll gstSettingViewModel');

                    Util.logger("gst setting response model: ", gstSettingsViewModel);
                    responseMessage = this.getResponseMessBuilder(MessageConstant.SUCCESS, gstSettingsViewModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_GST_SETTING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger("Gst settings facade  getSettings Error: ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_GST_SETTING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('gstSettingFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async updateGstSettings(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            whereCondition = new Object();
            whereCondition.token = reqMessage.token;
            let sessionModel: Models.session = await this.sessionBll.getOneByCondition(whereCondition, 'session details');
            Util.logger('update gst facade session ', sessionModel);

            if (sessionModel != null) {
                if (reqMessage.businessID != null && reqMessage.businessID > 0) {
                    let gstSettingModel: Models.gstSetting = new Models.gstSetting();
                    let buildObject: any = this.castObject(gstSettingModel, reqMessage.requestObj);
                    // Utils.logger('Build object',buildObject);

                    gstSettingModel = <Models.gstSetting> buildObject;
                    gstSettingModel.userID = sessionModel.userID;
                    gstSettingModel.businessID = reqMessage.businessID;

                    Util.logger('gst setting model to save ', gstSettingModel);

                    whereCondition = new Object();
                    whereCondition.userID = gstSettingModel.userID;
                    whereCondition.businessID = gstSettingModel.businessID;

                    gstSettingModel = await this.gstSettingsBll.updateByCondition(gstSettingModel, whereCondition, 'update gstSetting');
                    Util.logger('updated gst setting model ', gstSettingModel);

                    if (gstSettingModel != null) {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_GST_SETTING_SUCCESSFULLY, gstSettingModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_GST_SETTING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.BUSINESSID_REQUIRED, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger("gstSettingsFacade  update GstSettings Error: ", err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_GST_SETTING, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('gstSetttingsFacade', reqMessage, err);
        }
        return responseMessage;
    }

    async addGst(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            whereCondition = new Object();
            whereCondition.token = reqMessage.token;
            let sessionModel: Models.session = await this.sessionBll.getOneByCondition(whereCondition, 'session details');
            Util.logger('gst setting facade add GST ', sessionModel);

            if (sessionModel != null) {
                let gstSettingModel = new Models.gstSetting();
                gstSettingModel.userID = sessionModel.userID;
                gstSettingModel.status = 1;
                gstSettingModel.reportingFrequency = 1;
                gstSettingModel.isRegistered = true;
                gstSettingModel.accountingBasic = 1;
                gstSettingModel.selectedGstOption = 1;
                gstSettingModel.selectedBasLodgement = 1;

                Util.logger('gst entity before save ', gstSettingModel);

                delete gstSettingModel.gstSettingsID;
                gstSettingModel = await this.gstSettingsBll.save(gstSettingModel, 'save gstSettingModel');
                Util.logger('Gst setting added ', gstSettingModel);

                if (gstSettingModel != null) {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.ADD_GST_SUCCESSFULLY, gstSettingModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_ADD_GST, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                }
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_ADD_GST, null, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('gstSettingsFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}