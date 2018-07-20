/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/25/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {Inject} from "typescript-ioc";
import {Produces, Response, Tags} from 'typescript-rest-swagger';
import * as Facade from "../../facadeManager/startUp";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import {Accept, Path, POST} from "typescript-rest";
import VMaccessRightRoleMapping from "../../models/startUp/VMaccessRightRoleMapping";
import {DocGetAccessRightRoleMapping} from "../../swaggerDoc/swaggerDoc";


@Tags('Access Right (Author: Salahin)')
@Path('/api/accessRightRoleMapping')
export default class AccessRightRoleMappingController {

    @Inject
    accessRightRoleMappingFacade: Facade.accessRightRoleMapping;
 
    @Path('/getAll')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetAccessRightRoleMapping>(200, '')
    @POST
    public async getAllAccessRights(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accessRightRoleMappingFacade.getAllaccessRightRoleMapping(reqMessage);
        return result;
    }

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    @Response<VMaccessRightRoleMapping>(200, '')
    @POST
    public async saveOrUpdateAccessRight(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accessRightRoleMappingFacade.saveOrUpdate(reqMessage);
        return result;
    }
}