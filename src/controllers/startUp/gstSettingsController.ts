/**
 *
 * :=  coded with fun by Shuza Sa
 * :=  shuza.sa@gmail.com
 * :=  www.shuza.me
 * :=  Fun  :  Coffee  :  Code
 *
 **/
import {Accept, Path, POST} from "typescript-rest";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import {Inject} from "typescript-ioc";
import GstSettingsFacade from "../../facadeManager/startUp/gstSettingsFacade";
import {Produces, Response, Tags} from 'typescript-rest-swagger';
import {DocGetList, DocUpdateGstSetting} from "../../swaggerDoc/swaggerDoc";

@Tags('GstSettings (Author: Shuza)')
@Path('/api/Gst')
export class GstSettingsController {

    @Inject
    gstSettingsFacade: GstSettingsFacade;

    @Path('/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocGetList>(200, '')
    @POST
    async getGstSettings(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.gstSettingsFacade.getGstSettings(reqMessage);
        return result;
    }

    @Path('/update')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocUpdateGstSetting>(200, '')
    @POST
    async updateGstSettings(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.gstSettingsFacade.updateGstSettings(reqMessage);
        return result;
    }

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    @POST
    async addGST(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.gstSettingsFacade.addGst(reqMessage);
        return result;
    }
}