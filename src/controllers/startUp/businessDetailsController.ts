/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/9/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Accept, Path, POST} from 'typescript-rest';
import ResponseMessage from '../../core/responseMessage';
import Utils from '../../utils/utils';
import RequestMessage from '../../core/requestMessage';
import {Inject} from 'typescript-ioc';
import {Produces, Response, Tags} from 'typescript-rest-swagger';
import * as swaggerDoc from "../../swaggerDoc/businessDetailsControllerDoc";
import * as Facade from "../../facadeManager/startUp";
import {
    DocBusinessID, DocGetList, DocSaveBusinessContact, DocSaveCountry,
    DocSaveFinancialYear
} from "../../swaggerDoc/swaggerDoc";


@Tags('BusinessDetails (Author: Salahin)')
@Path('api/businessDetails/')
export class BusinessDetailsController {

    @Inject
    businessDetailsFacade: Facade.businessDetails;

    @Path('/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocBusinessID>(200, '')
    @POST
    async getBusinessDetails(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('getBusinessDetails method from controller');
        let result;
        result = await this.businessDetailsFacade.getBusinessDetails(reqMessage);
        return result;
    }

    /**
     * save BusinessDetails.
     * @param RequestMessage
     * @return ResponseMessage
     */
    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    @Response<swaggerDoc.saveBusinessDetails>(200, '')
    @POST
    async saveBusinessDetails(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('saveBusinessDetails method from controller');
        let result;
        result = await this.businessDetailsFacade.saveBusinessDetails(reqMessage);
        return result;
    }

    /**
     * update BusinessDetails.
     * @param RequestMessage
     * @return ResponseMessage
     */
    @Path('/update')
    @Produces('application/json')
    @Accept("application/json")
    @Response<swaggerDoc.updateBusinessDetails>(200, '')
    @POST
    async updateBusinessDetails(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('updateBusinessDetails method from controller');
        let result;
        result = await this.businessDetailsFacade.updateBusinessDetails(reqMessage);
        return result;
    }

    /**
     * save Country.
     * @param Country
     * @return Country
     */
    @Path('country/save')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSaveCountry>(200, '')
    @POST
    async saveCountry(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('saveCountry method from controller');
        let result;
        result = await this.businessDetailsFacade.saveCountry(reqMessage);
        return result;
    }

    /**
     * get all Countries.
     * @param Country array
     * @return Country array
     */
    @Path('country/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    @POST
    async getCountries(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('getCountries method from controller');
        let result;
        result = await this.businessDetailsFacade.getCountries(reqMessage);
        return result;
    }

    /**
     * save FinancialYear.
     * @param FinancialYear
     * @return FinancialYear
     */
    @Path('financialYear/save')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSaveFinancialYear>(200, '')
    @POST
    async saveFinancialYear(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('saveOrUpdateFinancialYear method from controller');
        let result;
        result = await this.businessDetailsFacade.saveFinancialYear(reqMessage);
        return result;
    }

    /**
     * get all FinancialYears.
     *
     * @return FinancialYear array
     */
    @Path('financialYear/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    @POST
    async getFinancialYears(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('getFinancialYears method from controller');
        let result;
        result = await this.businessDetailsFacade.getFinancialYears(reqMessage);
        return result;
    }

    /**
     * save BusinessContact.
     * @param BusinessContact
     * @return BusinessContact
     */
    @Path('businessContact/save')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSaveBusinessContact>(200, '')
    @POST
    async saveBusinessContact(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger('saveBusinessContact method from controller');
        let result;
        result = await this.businessDetailsFacade.saveBusinessContact(reqMessage);
        return result;
    }

    /**
     * get all BusinessContacts.
     * @param
     * @return BusinessContact array
     */
    @Path('businessContact/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    @POST
    async getBusinessContacts(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('getBusinessContacts method from controller');
        result = await this.businessDetailsFacade.getBusinessContacts(reqMessage);
        return result;
    }
}
