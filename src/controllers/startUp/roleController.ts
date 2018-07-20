/**
 *Author: Ayasha Siddiqua
 *Date: 10/23/17
 *Time: 1:55 PM
 */
import {Produces, Response, Tags} from 'typescript-rest-swagger';
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import {Inject} from "typescript-ioc";
import * as Facade from "../../facadeManager/startUp";
import {Accept, Path, POST} from "typescript-rest";
import {DocAddRoleReq, DocGetList} from "../../swaggerDoc/swaggerDoc";

@Tags('Role Controller (Author: Ayasha)')
@Path('api/role')
export default class RoleController {

    @Inject
    roleFacade: Facade.role;

    constructor() {
    }

    @Path('/save')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocAddRoleReq>(200, '')
    public async addRole(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.roleFacade.addRole(reqMessage);
        return result;
    }

    @Path('/get')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    async getRoleList(reqMessage: RequestMessage) {
        let result;
        result = await this.roleFacade.getRoleList(reqMessage);
        return result;
    }
}