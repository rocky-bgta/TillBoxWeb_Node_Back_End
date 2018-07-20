/**
 *Created By: Md. Abdul Hannan
 *Created Date: 14-Nov-17
 *Modified By: Md. Nazmus Salahin Rocky
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Inject} from "typescript-ioc";
import {Produces, Tags} from 'typescript-rest-swagger';
import * as Facade from "../../facadeManager/accounting";
import {Accept, Path, POST} from "typescript-rest";
import RequestMessage from '../../core/requestMessage';
import ResponseMessage from '../../core/responseMessage';


@Tags('Accounting (Author: Salahin)')
@Path('/api/moneyTransfer')
export default class MoneyTransferController {

    @Inject
    moneyTransferFacade: Facade.moneyTransfer;

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async saveMoneyTransfer(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.moneyTransferFacade.saveOrUpdateMoneyTransfer(reqMessage);
        return result;
    }


    @Path('/get')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getMoneyTransfer(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.moneyTransferFacade.getAllMoneyTransfer(reqMessage);
        return result;
    }

    @Path('availableBalance/get')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getAvailableBalance(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.moneyTransferFacade.getAvailableBalanceByAccountID(reqMessage);
        return result;
    }

}