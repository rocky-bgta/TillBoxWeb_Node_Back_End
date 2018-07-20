/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 14-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Accept, Path, POST} from "typescript-rest";
import {Inject} from "typescript-ioc";
import {Produces, Tags} from 'typescript-rest-swagger';
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import * as Facade from "../../facadeManager/accounting";

@Tags('Accounting (Author: Salahin)')
@Path('/api/budget')
export default class BudgetController {

    @Inject
    budgetFacade: Facade.budget;

    @Path('/dropDownList/get')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getBudgetDropDownList(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.budgetFacade.getBudgetDropDownList(reqMessage);
        return result;
    }

    @Path('/detail/get')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getBudgetDetail(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.budgetFacade.getBudgetDetail(reqMessage);
        return result;
    }


    @Path('/detail/save')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async saveBudgetDetail(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.budgetFacade.saveOrUpdateBudgetDetail(reqMessage);
        return result;
    }

}