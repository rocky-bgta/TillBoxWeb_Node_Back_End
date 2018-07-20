import {Produces, Response, Tags} from 'typescript-rest-swagger';
import {Accept, Path, POST} from "typescript-rest";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import * as Facade from "../../facadeManager/startUp";
import Utils from "../../utils/utils";
import {DocChangePassword} from "../../swaggerDoc/swaggerDoc";

@Tags('ChangePassword (Author: Ayasha)')
@Path('api/changePassword')

export class ChangePasswordController {
    changePasswordFacade: Facade.changePassword;

    constructor() {
        this.changePasswordFacade = new Facade.changePassword();
    }

    @Path('/update')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocChangePassword>(200, '')
    @POST
    async updateNewPassword(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        Utils.logger("changePassword from controller");
        result = await this.changePasswordFacade.updateNewPassword(reqMessage);
        return result;
    }
}
