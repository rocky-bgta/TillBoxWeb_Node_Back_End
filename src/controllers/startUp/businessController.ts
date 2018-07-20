import {Inject} from "typescript-ioc";
import RequestMessage from "../../core/requestMessage";
import ResponseMessage from "../../core/responseMessage";
import {Produces, Response, Tags} from 'typescript-rest-swagger';
import AddBusinessOptionModel from "../../models/startUp/addBusinessOptionModel";
import * as Facade from "../../facadeManager/startUp";
import * as BLL from "../../bllManager/startUp";
import {Accept, Path, POST} from "typescript-rest";
import {DocBusinessID, DocSaveBusiness} from "../../swaggerDoc/swaggerDoc";

@Tags('Business (Author: Shuza)')
@Path('/api/business')
export default class BusinessController {
    @Inject
    businessFacade: Facade.business;

    @Inject
    logMessageBll: BLL.logMessage;

    constructor() {
    }

    @Path('/getByUser')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocBusinessID>(200, '')
    @POST
    public async getAllBusiness(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.businessFacade.getAllBusiness(reqMessage);
        return result;
    }

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    @Response<DocSaveBusiness>(200, '')
    @POST
    public async addBusiness(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.businessFacade.addBusiness(reqMessage);
        return result;
    }

    @Path('/BusinessOptions/get')
    @Produces('application/json')
    @Accept("application/json")
    @Response<AddBusinessOptionModel>(200, '')
    @POST
    public async getAddBusinessOption(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.businessFacade.getBusinessOption(reqMessage);
        return result;
    }

    @Path('/select')
    @Produces('application/json')
    @Accept("application/json")
    @Response<ResponseMessage>(200, '')
    @POST
    public async selectBusiness(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.businessFacade.selectBusiness(reqMessage);
        return result;
    }
}