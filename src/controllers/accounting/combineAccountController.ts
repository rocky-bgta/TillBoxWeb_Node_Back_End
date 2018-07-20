
/**
 *Created By: Md. Nazmus Salahin Rocky
 *Created Date: 15-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import { Inject } from "typescript-ioc";
import { Produces, Tags} from 'typescript-rest-swagger';
import * as Facade from "../../facadeManager/accounting";
import { Accept, Path, POST } from "typescript-rest";
import RequestMessage from '../../core/requestMessage';
import ResponseMessage from '../../core/responseMessage';


@Tags('Combine Account (Author: Salahin)')
@Path('/api/combineAccount')
export default class CombineAccountController {

    @Inject
    combineAccountFacade: Facade.combineAccount;

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async saveCombineAccount(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.combineAccountFacade.saveOrUpdateCombineAccount(reqMessage);
        return result;
    }


    
    @Path('/get')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getCombineAccount(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.combineAccountFacade.getCombineAccount(reqMessage);
        return result;
    }

}