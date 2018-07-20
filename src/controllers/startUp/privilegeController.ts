/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/23/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import {Produces, Response, Tags} from "typescript-rest-swagger";
import {Accept, Path, POST} from "typescript-rest";
import RequestMessage from "../../core/requestMessage";
import {Inject} from "typescript-ioc";
import * as Facade from "../../facadeManager/startUp";
import ResponseMessage from "../../core/responseMessage";
import {DocGetList, DocSavePrivilege, DocSaveRolePrivilegeMapping} from "../../swaggerDoc/swaggerDoc";

@Tags('Privilege (Author: Shuza)')
@Path('api/privilege')
export default class PrivilegeController {

    @Inject
    privilege: Facade.privilege;
    @Inject
    roleMapping: Facade.privilegeRoleMapping;

    @Path('get')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    public async getPrivilegeList(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.privilege.getPrivilegeList(reqMessage);
        return result;
    }

    @Path('save')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSavePrivilege>(200, '')
    public async savePrivilege(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.privilege.addPrivilege(reqMessage);
        return result;
    }

    @Path('rolePrivilegeMapping/save')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSaveRolePrivilegeMapping>(200, '')
    public async saveRoleMapping(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.roleMapping.savePrivilegeRole(reqMessage);
        return result;
    }

    @Path('rolePrivilegeMapping/getByRoleID')
    @Produces('application/json')
    @Accept("application/json")
    @POST
    public async getAllRoleMapping(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.roleMapping.getAllRoleMapping(reqMessage);
        return result;
    }

    @Path('rolePrivilegeMapping/get')
    @POST
    public async getAll(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.roleMapping.getAllMapping(reqMessage);
        return result;
    }
}