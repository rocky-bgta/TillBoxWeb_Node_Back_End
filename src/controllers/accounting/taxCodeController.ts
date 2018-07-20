/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/9/17
 *Time: 5:43 PM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import RequestMessage from "../../core/requestMessage";
import Utils from "../../utils/utils";
import {Accept, Path, POST} from "typescript-rest";
import {Produces, Tags} from "typescript-rest-swagger";
import {Inject} from "typescript-ioc";
import * as Facade from "../../facadeManager/accounting";
import ResponseMessage from "../../core/responseMessage";

@Tags('TaxCode (Author: Ayasha)')
@Path('api/taxCode')
export default class TaxCodeController {

    @Inject
    taxCodeFacade: Facade.taxCode;

    constructor() {
    }

    @Path('/save')
    @Produces('application/json')
    @Accept('application/json')
    @POST
    async saveOrUpdateTaxCode(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('save or update taxCodeBll from controller ');
        result = await this.taxCodeFacade.saveOrUpdateTaxCode(reqMessage);
        return result;
    }

    @Path('/taxType/get')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    async getTaxTypeList(reqMessage: RequestMessage) {
        let result;
        result = await this.taxCodeFacade.getTaxTypeList(reqMessage);
        return result;
    }

    @Path('/get')
    @POST
    @Produces('application/json')
    @Accept('application/json')
    async getTaxCode(reqMessage: RequestMessage) {
        let result;
        result = await this.taxCodeFacade.getTaxCode(reqMessage);
        return result;
    }
}