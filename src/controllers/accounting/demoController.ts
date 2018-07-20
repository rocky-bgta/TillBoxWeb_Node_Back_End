/*
/!**
 *Created By: Md. Nazmus Salahin
 *Created Date: 14-Nov-17
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 *!/
import {Inject} from "typescript-ioc";
import {Produces, Tags} from 'typescript-rest-swagger';
import * as Facade from "../../facadeManager/accounting";
import {Accept, Path, POST} from "typescript-rest";
import RequestMessage from '../../core/requestMessage';
import ResponseMessage from '../../core/responseMessage';


@Tags('Journal (Author: Salahin)')
@Path('/api/journal')
export default class JournalController {

    @Inject
    journalFacade: Facade.journal;

    @Path('/save')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async saveJournal(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.journalFacade.saveOrUpdateJournal(reqMessage);
        return result;
    }


    @Path('/get')
    @Produces('application/json')
    @Accept("application/json")
    //@Response<DocGetList>(200, '')
    @POST
    public async getJournal(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let result;
        result = await this.journalFacade.getJournal(reqMessage);
        return result;
    }

}*/
