/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 11/20/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Accept, Path, POST} from "typescript-rest";
import {Produces, Tags} from "typescript-rest-swagger";
import ResponseMessage from "../../core/responseMessage";
import RequestMessage from "../../core/requestMessage";
import {Inject} from "typescript-ioc";
import * as Facade from "../../facadeManager/accounting";

@Tags('Opening Balance (Author: Salahin)')
@Path('/api/openingBalance')
export default class OpeningBalanceController {

    @Inject
    openingBalanceFacade: Facade.openingBalance;

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async saveOpeningBalance(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.openingBalanceFacade.saveOrUpdate(reqMessage);
        return result;
    }

    @Path('/getByAccountID')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getByAccountID(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.openingBalanceFacade.getByAccountID(reqMessage);
        return result;
    }

    @Path('/getByBusinessID')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getByBusinessID(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.openingBalanceFacade.getOpeningBalanceByBusinessID(reqMessage);
        return result;
    }

}