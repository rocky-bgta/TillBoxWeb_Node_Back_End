/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 09-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Inject} from "typescript-ioc";
import {Produces, Tags, Response} from 'typescript-rest-swagger';
import * as Facade from "../../facadeManager/accounting";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import {Accept, Path, POST} from "typescript-rest";
import AccountModel from "../../models/accounting/accountModel";
//import {DocGetList, DocSaveAccessRight} from "../../swaggerDoc/swaggerDoc";

@Tags('Accounting (Author: Salahin)')
@Path('/api/account')
export default class AccountController {

    @Inject
    accountFacade: Facade.account;

    @Path('/dropDownList')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getAllDropDownListForAccount(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accountFacade.getAccountDropDownList(reqMessage);
        return result;
    }

    @Path('/accountClassification/get')
    @Produces('application/json')
    @Accept("application/json")
    @POST
    public async getAccountClassification(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accountFacade.getAccountClassification(reqMessage);
        return result;
    }

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    @Response<AccountModel>(200, '')
    @POST
    public async saveOrUpdateAccount(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accountFacade.saveOrUpdateAccount(reqMessage);
        return result;
    }

    @Path('/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<AccountModel>(200, '')
    @POST
    public async getAccounts(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accountFacade.getAccountList(reqMessage);
        return result;
    }

    @Path('/withOpeningBalance/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<AccountModel>(200, '')
    @POST
    public async getAccountsWithOpeningBalance(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accountFacade.getAccountWithOpeningBalance(reqMessage);
        return result;
    }

   /* @Path('/history/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<AccountModel>(200, '')
    @POST
    public async getAccountHistory(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accountFacade.getAccountHistory(reqMessage);
        return result;
    }*/

    @Path('/parentAccount/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<AccountModel>(200, '')
    @POST
    public async getParentAccounts(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accountFacade.getParentAccounts(reqMessage);
        return result;
    }
}
