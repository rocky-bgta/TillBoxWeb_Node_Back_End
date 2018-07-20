/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/13/17
 *Time: 2:11 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import {Produces, Tags} from "typescript-rest-swagger";
import {Accept, Path, POST} from "typescript-rest";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import {Inject} from "typescript-ioc";
import * as Facade from "../../facadeManager/accounting";
import Utils from "../../utils/utils";

@Tags('Financial Year (Author: Ayasha)')
@Path('api/financialYear')
export default class FinancialYearController {

    @Inject
    financialYearFacade: Facade.financialYear;

    constructor() {
    }

    @Path('/save')
    @Produces('application/json')
    @Accept('application/json')
    @POST
    async saveOrUpdateFinancialYear(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('save financial year from controller ');
        result = await this.financialYearFacade.saveOrUpdateFinancialYear(reqMessage);
        return result;
    }

    @Path('/get')
    @Produces('application/json')
    @Accept('application/json')
    @POST
    async getFinancialYear(reqMessage: RequestMessage) {
        let result;
        Utils.logger('financial year list from controller ');
        result = await this.financialYearFacade.getFinancialYear(reqMessage);
        return result;
    }

    @Path('/currentFinancialYear/get')
    @Produces('application/json')
    @Accept('application/json')
    @POST
    async getCurrentFinancialYear(reqMessage: RequestMessage) {
        let result;
        Utils.logger('current FinancialYear list from controller ');
        result = await this.financialYearFacade.getCurrentAndFutureFinancialYear(reqMessage);
        return result;
    }
}