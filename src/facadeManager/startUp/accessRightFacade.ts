/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/23/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Inject} from 'typescript-ioc';
import ResponseMessage from '../../core/responseMessage';
import RequestMessage from '../../core/requestMessage';
import Utils from '../../utils/utils';
import {MessageConstant} from '../../core/messageConstant';
import * as Models from '../../models/startUp';
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as BLL from "../../bllManager/startUp"

export default class AccessRightFacade extends BaseFacade {

    @Inject
    private accessRightBll: BLL.accessRight;
    private accessRightModel: Models.accessRight;

    constructor() {
        super();
    }

    async getAllAccessRight(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null;
        Utils.logger('getAllAccessRight method from facade');
        try {
            result = await this.accessRightBll.getAll('getAll accessRight');
            if (result != null) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_ACCESS_RIGHT, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ACCESS_RIGHT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_ACCESS_RIGHT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getAllAccessRight', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async saveOrUpdateAccessRight(reqMessage: RequestMessage) {
        let responseMessage: ResponseMessage = null;
        let result = null, whereCondition = this.customObject;
        this.accessRightModel = <Models.accessRight>reqMessage.requestObj;
        let accessRightID: number = this.accessRightModel.accessRightID;

        try {
            //save
            if (this.lodash.isNumber(accessRightID) && accessRightID == 0) {
                delete this.accessRightModel.accessRightID;
                result = await this.accessRightBll.save(this.accessRightModel, 'save accessRight');
                responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_ACCESS_RIGHT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                //update
                if (this.lodash.isNumber(accessRightID) && accessRightID > 0) {
                    whereCondition = new Object();
                    whereCondition.accessRightID = accessRightID;

                    result = await this.accessRightBll.updateByCondition(this.accessRightModel, whereCondition, 'update AccessRight');

                    if (this.lodash.isArray(result)) {
                        if (result[0] > 0) {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_ACCESS_RIGHT_SUCCESSFULLY, this.accessRightModel, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                        } else {
                            responseMessage = this.getResponseMessBuilder(MessageConstant.NO_CHANGE_FOUND_IN_UPDATE, this.accessRightModel, MessageConstant.NO_CONTENT_CODE, null, reqMessage.businessID);
                        }
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_ACCESS_RIGHT, this.accessRightModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_REQUEST, this.accessRightModel, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    return responseMessage;
                }
            }
        } catch (err) {
            Utils.logger('Error log', err);
            if (accessRightID == 0) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_ACCESS_RIGHT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_ACCESS_RIGHT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
            await this.exceptionLogSave('accessRightFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    /*async saveAccessRight(reqMessage: RequestMessage) {
        let result: Models.accessRight = null;
        let responseMessage: ResponseMessage = null;
        try {
            this.accessRightModel = <Models.accessRight>reqMessage.requestObj;

            delete this.accessRightModel.accessRightID; // delete property

            // hold model after save
            result = await this.accessRightBll.save(this.accessRightModel, 'save accessRight');

            if (result) {
                // update result after save
                result = this.accessRightModel;
                responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_ACCESS_RIGHT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_ACCESS_RIGHT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            }

        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_ACCESS_RIGHT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('saveAccessRight', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async updateAccessRight(reqMessage: RequestMessage) {
        let result: Models.accessRight = null, updateID = null;
        let responseMessage: ResponseMessage = null;
        try {
            this.accessRightModel = <Models.accessRight>reqMessage.requestObj;
            updateID = this.accessRightModel.accessRightID;

            let whereCondition = {
                accessRightID: updateID
            };

            // hold model after update
            result = await this.accessRightBll.updateByCondition(this.accessRightModel, whereCondition, 'update AccessRight');
            if (result != null) {
                responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_ACCESS_RIGHT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE);
            }
            else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_BUSINESS_DETAILS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            }
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_ACCESS_RIGHT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE);
            await this.exceptionLogSave('updateAccessRight', reqMessage.requestObj, err);
        }
        return responseMessage;
    }*/
}