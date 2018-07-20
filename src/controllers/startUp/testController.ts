/**
 * This is a demo operation to show how to use typescript-rest library.
 */
import {Context, GET, Path, POST, ServiceContext} from 'typescript-rest';
import CustomerFacade from '../../facadeManager/startUp/customerFacade';
import Customer from '../../models/startUp/customerModel';
import Util, {default as Utils} from '../../utils/utils';
import {Response, Tags} from 'typescript-rest-swagger';
import MailSender from '../../utils/mailSender';
import Authentication from "../../security/authentication";
import TokenModel from "../../security/tokenModel";
import * as BLL from "../../bllManager/startUp";
import {Inject} from "typescript-ioc";
import * as path from "path";
import BaseDao from "../../core/abstractClass/baseDao";
import {QueryType} from "../../core/enum/enums";

let uniqid = require('uniqid');


@Tags('Test Controller (Author: Salahin)')
@Path('api/test')
export class TestController extends BaseDao {

    customerFacade: CustomerFacade;
    customer: Customer;

    @Inject
    financialYearBll: BLL.financialYear;

    constructor() {
        super();
        this.customerFacade = new CustomerFacade(this.customer);
    }


    /**
     * Wait function test
     *
     * @return Wait function test
     */
    @Path('/get/1.5')
    @GET
    async Wati1_5_Second(): Promise<string> {
        await setTimeout(function () {
            console.log("I am after 5 second");
        }, 5000);

        return "Success after 5 second";
    }

    @Path('/get/2')
    @GET
    async Wati1_2_Second(): Promise<string> {
        await setTimeout(function () {
            console.log("I am after 2 second");
        }, 2000);

        return "Success after 2 second";
    }

    @Path('/get/10')
    @GET
    async Wati1_10_Second(): Promise<string> {
        await setTimeout(function () {
            console.log("I am after 10 second");
        }, 10000);

        return "Success after 10 second";
    }


    @Path('/test/mailSend')
    @POST
    public async testMailSend() {
        try {
            MailSender.mailSend('rocky.bgta@gmail.com', 'Hello', 'No');
        } catch (err) {

        }
    }

    @Path('/security/get')
    @GET
    public testSecurity(@Context context: ServiceContext) {
        Util.logger('Come to test security method');
        //Utils.logger('ClientData Object', clientData);
        return;
    }


    @Path('/test')
    @GET
    public async test() {
        let whereCondition: any;
        whereCondition = {aaa: "aaa"};
        whereCondition.bbb = "bbbb";
        return JSON.stringify(whereCondition, null, 2);
    }

    @Path('/tokenGeneratoin')
    @GET
    public async tokenGeneratoin(): Promise<TokenModel> {
        let token = new Authentication();
        let tokenObject = await token.generateToken('rocky');
        return tokenObject;
    }

    @Path('/decodeToken')
    @Response<TokenModel>(200, 'Save country.')
    @POST
    public async decodeToken(inputToken: TokenModel) {
        let token = new Authentication();
        let tokenModel = await token.decodeToken(inputToken);
        return tokenModel;
    }

    @Path('/externalModule')
    @POST
    public async externalModule() {
        //let external = new BLL.demo();
        //external.test();
        return;
    }

    @Path('/uniqueId')
    @POST
    public async uniqueId() {
        let uniqueID: string;
        uniqueID = uniqid();

        console.log(uniqid()); // -> 4n5pxq24kpiob12og9
        console.log(uniqid(), uniqid());

        console.info('Data Base Date: ' + Utils.getDbNameByBusinessName("Froot"));
        return;
    }

    @Path('/periodCalculation')
    @POST
    public async periodCalculation() {

        let startDate = Utils.getStartDateFromYearMonth(2017, 5);
        Utils.logger("Start Date", startDate);
        let endDate = Utils.getEndDateFromYearMonth(2017, 5);
        Utils.logger("End Date", endDate);
        return;
    }

    @Path('/selectCurrentFY')
    @POST
    public async selectCurrentFY(): Promise<any> {
        let dirPath = __dirname;
        Utils.logger(dirPath);

        let result = await this.financialYearBll.selectCurrentFinancialYear(1);
        let starDate = Utils.getStartDateFromYearMonth(2017, 2); //month index from 0
        let endDate = Utils.getEndDateFromYearMonth(2017, 4);
        let validDate = await this.financialYearBll.validateInputFinancialYear(1, starDate, endDate);

        let starDate2 = Utils.getStartDateFromYearMonth(2018, 1); //month index from 0
        let endDate2 = Utils.getEndDateFromYearMonth(2018, 4);

        validDate = await this.financialYearBll.validateInputFinancialYear(1, starDate2, endDate2);

        Utils.logger('' + validDate);
        return result;
    }

    @Path('/InsertFixedTableData ')
    @POST
    public async InsertFixedTableData(): Promise<any> {
        let dirPath = __dirname + '\..\tableData';
        dirPath = path.resolve(__dirname, '..', '..', '..', 'tableData');
        Utils.insertDataIntoFixedTable(dirPath.toString());
        Utils.logger(dirPath);

        return dirPath;
    }

    @Path('/checkSequence ')
    @POST
    public async checkSequence(): Promise<any> {
        let result;
        result = await this.executeRawQuery('SELECT nextval(\'journalReferenceNo\');', QueryType.Select);
        Utils.logger(result);

        return result;
    }

}