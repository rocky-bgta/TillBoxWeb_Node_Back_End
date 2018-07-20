/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/23/2017
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
import {DocGetList, DocSaveAccessRight} from "../../swaggerDoc/swaggerDoc";

@Tags('Access Right (Author: Salahin)')
@Path('/api/accessRight')
export default class AccessRightController {

    @Inject
    accessRightFacade: Facade.accessRight;

    @Path('/getAllAccessRight')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    @POST
    public async getAllAccessRights(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accessRightFacade.getAllAccessRight(reqMessage);
        return result;
    }

    @Path('/saveUpdate')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSaveAccessRight>(200, '')
    @POST
    public async saveOrUpdateAccessRight(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.accessRightFacade.saveOrUpdateAccessRight(reqMessage);
        return result;
    }
}