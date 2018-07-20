/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/9/2017
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
import * as _ from 'lodash';
import BaseFacade from "../../core/abstractClass/baseFacade";
import {ICustomType} from "../../core/interface/ICustomType";
import AddressModel from "../../models/startUp/addressModel";


import * as BLL from "../../bllManager/startUp"

export default class BusinessDetailsFacade extends BaseFacade {

    @Inject
    private countryBll: BLL.country;
    @Inject
    private financialYearBll: BLL.financialYear;
    @Inject
    private businessContactBll: BLL.businessContact;
    @Inject
    private addressBll: BLL.address;
    @Inject
    private businessDetailsBll: BLL.businessDetails;
    @Inject
    private businessBll: BLL.business;

    private countryModel: Models.country;
    private financialYearModel: Models.financialYear;
    private businessContactModel: Models.businessContact;
    private businessDetailsModel: Models.businessDetails;
    private businessAddressList: Models.address[];
    private businessDetailsViewModel: Models.VMbusinessDetailsView;

    constructor() {
        super();
    }

    async saveCountry(reqMessage: RequestMessage) {
        let result = null;
        let responseMessage: ResponseMessage = null;
        try {
            Utils.logger('saveCountry method from facade');
            this.countryModel = <Models.country>reqMessage.requestObj;
            delete this.countryModel.countryID;
            result = await this.countryBll.save(this.countryModel, 'save country');
            responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_COUNTRY_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_COUNTRY, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('saveCountry', reqMessage, err);
        }
        return responseMessage;
    }

    async getCountries(reqMessage: RequestMessage) {
        let result = null;
        let responseMessage: ResponseMessage = null;
        Utils.logger('getCountries method from facade');
        try {
            result = await this.countryBll.getAll('getCountries');
            //await this.resMessage.setResponseObject(result);
            responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_COUNTRIES, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_COUNTRIES, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getCountries', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async saveFinancialYear(reqMessage: RequestMessage) {
        let result = null;
        let responseMessage: ResponseMessage = null;
        try {
            Utils.logger('saveFinancialYear method from facade');
            this.financialYearModel = <Models.financialYear>reqMessage.requestObj;
            delete this.financialYearModel.financialYearID;
            result = await this.financialYearBll.save(this.financialYearModel, 'save financialYear');
            responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_FINANCIAL_YEAR_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_FINANCIAL, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('saveFinancialYear', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async getFinancialYears(reqMessage: RequestMessage) {
        let result = null;
        let responseMessage: ResponseMessage = null;

        Utils.logger('getFinancialYear method from facade');
        try {
            result = await this.financialYearBll.getAll('getAll financial year');
            //await this.resMessage.setResponseObject(result);
            responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_FINANCIAL_YEARS, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_FINANCIAL_YEARS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getFinancialYears', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async saveBusinessContact(reqMessage: RequestMessage) {
        let result = null;
        let responseMessage: ResponseMessage = null;
        try {
            Utils.logger('saveBusinessContact method from facade');
            this.businessContactModel = <Models.businessContact>reqMessage.requestObj;
            delete this.businessDetailsModel.businessDetailsID;
            result = await this.businessContactBll.save(this.businessContactModel, 'save businessContact');
            responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_BUSINESS_CONTACT_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_BUSINESS_CONTACT, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('saveBusinessContact', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async getBusinessContacts(reqMessage: RequestMessage) {
        let result = null;
        let responseMessage: ResponseMessage = null;
        Utils.logger('getBusinessContacts method from facade');
        try {
            result = await this.businessContactBll.getAll('getAll businessContact');
            responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_BUSINESS_CONTACTS, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_BUSINESS_CONTACTS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getBusinessContacts', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async getBusinessDetails(reqMessage: RequestMessage) {
        let businessID = null, whereCondition = this.customObject;
        let responseMessage: ResponseMessage = null;
        let businessModel: Models.business = null;
        let buildMessage = this.getStringBuilder();
        let result: Models.VMbusinessDetailsView = null, crudSteps: boolean = true;
        try {

            ///////// start example use of raw query ////////////
            //rawQueryResult= await this.businessDetailsService.VMgetBusinessDetails();
            //rawQueryResult.forEach((item:any)=>{
            //    Util.logger('item',item.emailAddress);
            //})
            ///////// end example use of raw query ////////////
            businessID = _.toNumber(reqMessage.businessID);
            //let fieldName: string = 'businessID';

            whereCondition = new Object();
            whereCondition.businessID = businessID;
            // find one Business details
            let businessDetailsModel = await this.businessDetailsBll.getOneByCondition(whereCondition, 'get businessDetailsModel');

            //get only business name =========================================
            if (businessDetailsModel == null) {
                this.businessDetailsViewModel = new Models.VMbusinessDetailsView();

                businessModel = await this.businessBll.getOneByCondition(whereCondition, 'get businessModel');

                this.businessDetailsViewModel.business = businessModel;
                result = this.businessDetailsViewModel;

                responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_BUSINESS_DETAILS_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                return responseMessage;

            }
            //========================================================
            if (businessDetailsModel != null) {
                buildMessage.append(MessageConstant.GET_ALL_BUSINESS_DETAILS);
            } else {
                buildMessage.append(MessageConstant.FAILED_TO_GET_BUSINESS_DETAILS);
                crudSteps = false;
            }

            buildMessage.appendLine();

            let businessContactModel = await this.businessContactBll.getOneByCondition(whereCondition, 'get businessContactModel');
            if (businessContactModel != null && crudSteps) {
                buildMessage.append(MessageConstant.GET_ALL_BUSINESS_CONTACTS);
            } else {
                buildMessage.append(MessageConstant.FAILED_TO_GET_BUSINESS_CONTACTS);
                crudSteps = false;
            }
            buildMessage.appendLine();

            let businessAddressList = await this.addressBll.getAllByCondition(whereCondition, 'get businessAddressList');
            if (businessAddressList != null && crudSteps) {
                buildMessage.append(MessageConstant.GET_ALL_BUSINESS_ADDRESS_LIST);
            } else {
                buildMessage.append(MessageConstant.FAILED_TO_GET_BUSINESS_ADDRESS_LIST);
                crudSteps = false;
            }
            buildMessage.appendLine();

            businessModel = await this.businessBll.getOneByCondition(whereCondition, 'get businessModel');
            if (businessModel && crudSteps) {
                buildMessage.append(MessageConstant.GET_ALL_BUSINESS);
            } else {
                buildMessage.append(MessageConstant.FAILED_TO_GET_BUSINESS);
                crudSteps = false;
            }

            //buildMessage.appendLine();
            // update VM after find specific business and return VM
            if (crudSteps) {
                this.businessDetailsViewModel = new Models.VMbusinessDetailsView();
                this.businessDetailsViewModel.businessDetails = businessDetailsModel;
                this.businessDetailsViewModel.businessContact = businessContactModel;
                this.businessDetailsViewModel.businessAddressList = businessAddressList;
                this.businessDetailsViewModel.business = businessModel;
                result = this.businessDetailsViewModel;

                responseMessage = this.getResponseMessBuilder(MessageConstant.GET_ALL_BUSINESS_DETAILS_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_BUSINESS_DETAILS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }

        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_BUSINESS_DETAILS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('getBusinessDetails', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async saveBusinessDetails(reqMessage: RequestMessage) {
        //let addressType;
        let responseMessage: ResponseMessage = null;
        let businessID = _.toNumber(reqMessage.businessID);
        let result: Models.VMbusinessDetailsView = null, crudSteps: boolean = true;
        let buildMessage = this.getStringBuilder();
        try {
            this.businessDetailsViewModel =
                <Models.VMbusinessDetailsView>reqMessage.requestObj;

            // update vm with provided businessID
            this.businessDetailsViewModel.businessDetails.businessID = businessID;
            this.businessDetailsViewModel.businessContact.businessID = businessID;

            // Extract data from VM
            this.businessDetailsModel = this.businessDetailsViewModel.businessDetails;
            this.businessAddressList = this.businessDetailsViewModel.businessAddressList;
            this.businessContactModel = this.businessDetailsViewModel.businessContact;


            // hold model after save
            delete this.businessDetailsModel.businessDetailsID;
            this.businessDetailsModel = await this.businessDetailsBll.save(this.businessDetailsModel, 'save businessDetails model');
            if (this.businessDetailsModel != null) {
                buildMessage.append(MessageConstant.SAVE_BUSINESS_DETAILS_SUCCESSFULLY);
            } else {
                buildMessage.append(MessageConstant.FAILED_TO_SAVE_BUSINESS_DETAILS);
                crudSteps = false;
            }

            delete this.businessContactModel;
            this.businessContactModel = await this.businessContactBll.save(this.businessContactModel, 'save businessContact model');
            if (this.businessContactModel != null && crudSteps) {
                buildMessage.append(MessageConstant.SAVE_BUSINESS_CONTACT_SUCCESSFULLY);
            } else {
                buildMessage.append(MessageConstant.FAILED_TO_SAVE_BUSINESS_CONTACT);
                crudSteps = false;
            }

            if (crudSteps) {
                for (let index in this.businessAddressList) {
                    this.businessAddressList[index].businessID = businessID;
                    delete this.businessAddressList[index].addressID;
                    this.businessAddressList[index] = await this.addressBll.save(this.businessAddressList[index], 'save');
                }
            }

            if (crudSteps) {
                // update VM after save and return VM
                this.businessDetailsViewModel.businessDetails = this.businessDetailsModel;
                this.businessDetailsViewModel.businessContact = this.businessContactModel;
                this.businessDetailsViewModel.businessAddressList = this.businessAddressList;
                result = this.businessDetailsViewModel;

                responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_BUSINESS_DETAILS_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_BUSINESS_DETAILS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }

        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_GET_BUSINESS_DETAILS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('saveBusinessDetails', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async updateBusinessDetails(reqMessage: RequestMessage) {
        let result: Models.VMbusinessDetailsView = null, crudSteps: boolean = true;
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        try {
            this.businessDetailsViewModel =
                <Models.VMbusinessDetailsView>reqMessage.requestObj;
            let businessID = _.toNumber(reqMessage.businessID);
            //let fieldName = 'businessID';

            let businessDetailsModel: any = null,
                businessAddressList: any = new Array<any>(),
                businessContactModel: any = null;


            // Extract data from VM
            this.businessDetailsModel = this.businessDetailsViewModel.businessDetails;
            this.businessAddressList = this.businessDetailsViewModel.businessAddressList;
            this.businessContactModel = this.businessDetailsViewModel.businessContact;
            //this.businessModel = this.businessDetailsViewModel.business;

            whereCondition = new Object();
            whereCondition.businessID = businessID;

            /* let whereCondition = {
                 businessID: businessID
             };*/

            // hold model after update
            businessDetailsModel =
                await this.businessDetailsBll.updateByCondition(this.businessDetailsModel, whereCondition, 'update businessDetails');
            Utils.logger('return after update ', businessDetailsModel[0]);
            if (businessDetailsModel != null) {
                ;
            } else {
                crudSteps = false;
            }

            // hold model after update
            if (crudSteps) {
                businessContactModel =
                    await this.businessContactBll.updateByCondition(this.businessDetailsModel, whereCondition, 'business contact model');
            } else {
                crudSteps = false;
            }

            // where clause for businessAddressEntity
            let whereClause: ICustomType = {};

            if (crudSteps) {
                for (let index in this.businessAddressList) {
                    let addressID = this.businessAddressList[index].addressID;

                    if (addressID == 0) {
                        //insert new address
                        let addressModel: AddressModel = this.businessAddressList[index];
                        delete addressModel.addressID; // delete property
                        addressModel.businessID = businessID;
                        this.businessAddressList[index] = await this.addressBll.save(addressModel);
                    } else {

                        whereClause.businessID = businessID;
                        whereClause.addressID = this.businessAddressList[index].addressID;

                        // update businessID to businessAddressList before update
                        this.businessAddressList[index].businessID = businessID;
                        // hold model after update
                        businessAddressList[index] = await this.addressBll.updateByCondition(this.businessAddressList[index], whereClause, 'businessAddressList');
                    }
                    Utils.logger('return after update ', businessAddressList[index]);
                }
            }

            if (businessDetailsModel != null && businessAddressList != null && businessContactModel != null) {
                Utils.logger('Update operation successful');
                Utils.logger('Populate Models after update');


                let businessDetailsModel = await this.businessDetailsBll.getOneByCondition(whereCondition, 'get businessDetails model');
                let businessContactModel = await this.businessContactBll.getOneByCondition(whereCondition, 'get businessContact model');
                let businessAddressList = await this.addressBll.getAllByCondition(whereCondition, 'get businessAddressList model');

                Utils.logger('update VM after update');
                this.businessDetailsViewModel.businessDetails = businessDetailsModel;
                this.businessDetailsViewModel.businessContact = businessContactModel;
                this.businessDetailsViewModel.businessAddressList = businessAddressList;
                result = this.businessDetailsViewModel;

                responseMessage = this.getResponseMessBuilder(MessageConstant.UPDATE_BUSINESS_DETAILS_SUCCESSFULLY, result, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);

            } else {
                responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_BUSINESS_DETAILS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }

        } catch (err) {
            Utils.logger('Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_UPDATE_BUSINESS_DETAILS, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('updateBusinessDetails', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}