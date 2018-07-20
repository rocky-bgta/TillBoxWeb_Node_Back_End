/**
 *Author: Ayasha Siddiqua
 *Date: 10/5/17
 *Time: 4:39 PM
 */
import {Accept, Path, POST} from "typescript-rest";

import {Inject} from "typescript-ioc";
import {Produces, Response, Tags} from 'typescript-rest-swagger';
import * as Facade from "../../facadeManager/startUp";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import Utils from "../../utils/utils";
import {DocGetToken, DocUserInvitation} from "../../swaggerDoc/swaggerDoc";

@Tags('Invite User (Author: Ayasha)')
@Path('api/userInvite')
export class UserInviteController {

    userInviteFacade: Facade.userInvite;

    @Inject
    userFacade: Facade.user;

    constructor() {
        this.userInviteFacade = new Facade.userInvite();
    }

    @Path('/invite')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocUserInvitation>(200, '')
    @POST
    async inviteUser(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('invite user from controller');
        result = await this.userInviteFacade.inviteUser(reqMessage);
        return result;
    }

    @Path('/createUserWithBusinessId')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocGetToken>(200, '')
    @POST
    async createUserWithBusinessId(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('create user with business from controller');
        result = await this.userInviteFacade.createUserWithBusinessId(reqMessage);
        return result;
    }

    @Path('/removeInvitation')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocGetToken>(200, '')
    @POST
    public async removeInvitation(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('remove Invitation from controller');
        result = await this.userInviteFacade.removeInvitation(reqMessage);
        return result;
    }

    @Path('/reInvite')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocGetToken>(200, '')
    @POST
    async reInvite(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('reInvite from controller');
        result = await this.userInviteFacade.reInviteUser(reqMessage);
        return result;
    }
}