import {Accept, Path, POST} from "typescript-rest";
import ResponseMessage from "../../core/responseMessage";
import {Inject} from "typescript-ioc";
import RequestMessage from "../../core/requestMessage";
import {Produces, Response, Tags} from 'typescript-rest-swagger';
import Utils from "../../utils/utils";
import * as Facade from "../../facadeManager/startUp";
import {DocEditUser, DocBusinessID, DocGetList, DocSignUpReq, DocBusinessIDUserID} from "../../swaggerDoc/swaggerDoc";

@Tags('Register User (Author: Shuza)')
@Path('api/user')
export class UserController {

    @Inject
    userFacade: Facade.user;

    constructor() {
    }

    @Path('/signup')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSignUpReq>(200, '')
    @POST
    async signUp(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let resMessage;
        Utils.logger("Sign up method from controller");
        resMessage = await this.userFacade.saveUser(reqMessage);
        return resMessage;
    }

    @Path('/login')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSignUpReq>(200, '')
    @POST
    async login(reqMmessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger("login method from controller");
        result = await this.userFacade.userSignIn(reqMmessage);
        return result;
    }

    @Path('/getUserListByBusinessID')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocGetList>(200, '')
    @POST
    async getUserList(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger("getUserList method from controller");
        let result;
        result = await this.userFacade.getUserList(reqMessage);
        return result;
    }

    @Path('/editUser')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocEditUser>(200, '')
    @POST
    async editUser(reqMessage: RequestMessage) {
        Utils.logger("editUser method from controller ");
        let result;
        result = await this.userFacade.editUser(reqMessage);
        return result;
    }

    @Path('/getUserListActiveAndInactiveAndInvited')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocBusinessID>(200, '')
    @POST
    async getUserListActiveAndInactiveAndInvited(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger("getUserListActiveAndInactiveAndInvited method from controller");
        let result;
        result = await this.userFacade.getUserActiveAndInactiveAndInvitedUserList(reqMessage);
        return result;
    }

    @Path('/activateUser')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocBusinessIDUserID>(200, '')
    @POST
    async activateUser(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger("activateUser method from controller");
        let result;
        result = await this.userFacade.activateUser(reqMessage);
        return result;
    }

    @Path('/inActivateUser')
    @Accept("application/json")
    @Produces('application/json')
    @Response<DocBusinessIDUserID>(200, '')
    @POST
    async inActivateUser(reqMessage: RequestMessage): Promise<ResponseMessage> {
        Utils.logger("inActivateUser method from controller");
        let result;
        result = await this.userFacade.inActivateUser(reqMessage);
        return result;
    }
}