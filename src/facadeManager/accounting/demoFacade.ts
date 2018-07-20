/*
/!**
 *Created By: Md. Nazmus Salahin
 *Created Date: 14-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 *!/
import BaseFacade from "../../core/abstractClass/baseFacade";
import {Inject} from "typescript-ioc";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import Utils from "../../utils/utils";
import * as BLL from "../../bllManager/accounting";
import {Message} from "../../core/messageConstant/accounting";
import {MessageConstant} from "../../core/messageConstant";
import * as Models from '../../models/accounting';
//import * as _ from 'lodash';
//import {clientData} from "../../middlewares/filter";
//import * as startUpBLL from "../../bllManager/startUp/index";
//import * as startUpModels from "../../models/startUp/index"
import * as Enum from "../../core/enum/accounting/enums";
export default class NameFacade extends BaseFacade {

    @Inject
    journalBll: BLL.journal;

    constructor() {
        super();
    }

    private journalModel: Models.journal;

    async saveOrUpdate(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage;
        let result;
        let whereCondition = this.customObject;
        this.journalModel = <Models.journal> reqMessage.requestObj;
        try {
            if (this.journalModel.journalID == 0) {
                //save
                Utils.logger('save from Journal facade ');
                result = await this.journalBll.save(this.journalModel);

                if (result != null) {
                    responseMessage = this.getResponseMessBuilder(Message.SAVE_JOURNAL_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_SAVE_JOURNAL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            } else {
                //update
                whereCondition.journalID = this.journalModel.journalID;
                result = await this.journalBll.updateByCondition(this.journalModel, whereCondition);

                if (result != null && result > 0) {
                    responseMessage = this.getResponseMessBuilder(Message.UPDATE_JOURNAL_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
                } else {
                    responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_UPDATE_JOURNAL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
                }
            }

        } catch (err) {
            Utils.logger('financialYear facade error ');
            if(this.journalModel.journalID == 0){
                responseMessage = this.getResponseMessBuilder(Message.SAVE_JOURNAL_SUCCESSFULLY, reqMessage, MessageConstant.FAILED_ERROR_CODE);
            }else {
                responseMessage = this.getResponseMessBuilder(Message.UPDATE_JOURNAL_SUCCESSFULLY, reqMessage, MessageConstant.FAILED_ERROR_CODE);
            }
            await this.exceptionLogSave('saveOrUpdateJournal facade', reqMessage, err);
        }
        return responseMessage;
    }

    public async getAll(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage;
        Utils.logger('get all Journal from facade ');
        let result;
        try {
            result = await this.journalBll.getAll();
            if (result) {
                responseMessage = this.getResponseMessBuilder(Message.GET_JOURNAL_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_JOURNAL, reqMessage, MessageConstant.FAILED_ERROR_CODE);
            }
        } catch (err) {
            Utils.logger('get Journal error ');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_JOURNAL, reqMessage, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('getJournalFacade', reqMessage, err);
        }
        return responseMessage;
    }

    public async getAllByID(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage;
        Utils.logger('get all Journal from facade ');
        let result;
        try {
            result = await this.journalBll.getAll();
            if (result) {
                responseMessage = this.getResponseMessBuilder(Message.GET_JOURNAL_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
            } else {
                responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_JOURNAL, reqMessage, MessageConstant.FAILED_ERROR_CODE);
            }
        } catch (err) {
            Utils.logger('get Journal error ');
            responseMessage = this.getResponseMessBuilder(Message.FAILED_TO_GET_JOURNAL, reqMessage, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('getJournalFacade', reqMessage, err);
        }
        return responseMessage;
    }
}*/
