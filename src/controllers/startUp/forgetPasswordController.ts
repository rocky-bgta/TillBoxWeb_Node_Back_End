import {Produces, Response, Tags} from 'typescript-rest-swagger';
import RequestMessage from '../../core/requestMessage';
import * as Facade from "../../facadeManager/startUp";
import * as Models from "../../models/startUp";
import ResponseMessage from "../../core/responseMessage";
import {Accept, Path, POST} from "typescript-rest";
import {DocUserID, DocUserIDPassword} from "../../swaggerDoc/swaggerDoc";
import Utils from "../../utils/utils";

@Tags('ForgetPassword (Author: Ayasha)')
@Path('api/forgetPassword')

export class ForgetPasswordController {
    forgetPasswordFacade: Facade.forgetPassword;
    forgetPassword: Models.forgetPassowrdToken;

    constructor() {
        this.forgetPasswordFacade = new Facade.forgetPassword(this.forgetPassword);
    }

    @Path('/userID/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocUserID>(200, '')
    @POST
    async getUserID(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('getUserID method from controller');
        result = await this.forgetPasswordFacade.validateUser(reqMessage);
        return result;
    }

    @Path('/update')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocUserIDPassword>(200, '')
    @POST
    async changePassword(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger('changePassword method from controller');
        result = await this.forgetPasswordFacade.changePassword(reqMessage);
        return result;
    }
}