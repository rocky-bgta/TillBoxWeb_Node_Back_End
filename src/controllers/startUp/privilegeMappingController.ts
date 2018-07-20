/**
 *
 * :=  created by:  Shuza
 * :=  create date:  10/24/17
 * :=  (C) CopyRight NybSys Ltd
 * :=  Fun  :  Coffee  :  Code
 *
 **/

import * as Facade from "../../facadeManager/startUp";
import {Inject} from "typescript-ioc";
import {Accept, Path, POST} from "typescript-rest";
import RequestMessage from "../../core/requestMessage";
import {Produces, Response, Tags} from "typescript-rest-swagger";
import ResponseMessage from "../../core/responseMessage";
import {DocGetList, DocSavePrivilegeMapping} from "../../swaggerDoc/swaggerDoc";

@Tags('PrivilegeFacade Mapping controller  (Author: Shuza)')
@Path('api/privilegeMapping')
export default class PrivilegeMappingController {

    @Inject
    privilegeMappingFacade: Facade.privilegeMapping;

    @Path('get')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    public async getAllMapping(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.privilegeMappingFacade.getAllPrivilegeServiceMapping(reqMessage);
        return result;
    }

    @Path('save')
    @POST
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSavePrivilegeMapping>(200, '')
    public async savePrivilegeServiceMapping(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.privilegeMappingFacade.savePrivilegeServiceMapping(reqMessage);
        return result;
    }
}