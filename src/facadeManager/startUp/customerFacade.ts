import CustomerService from "../../bllManager/startUp/customerBll";
import Customer from "../../models/startUp/customerModel";
import {Inject} from "typescript-ioc";
import ResponseMessage from "../../core/responseMessage";
import RequestMessage from "../../core/requestMessage";
//import Utils from "../../utils/utils";
import * as BLL from "../../bllManager/startUp";
import BaseFacade from "../../core/abstractClass/baseFacade";
//import Utils from "../../utils/utils";


/*class Foo {
    myMethod(a: string):any;
    myMethod(a: number):any;
    myMethod(a: number, b: string):any;
    myMethod(a: any, b?: string):any {
        console.log(a+ b);
    }
}*/
//let overload = new Foo();
//overload.myMethod('Overloading Stared from Customer Facade');

export default class CustomerFacade extends BaseFacade {
    // Inject customer Service
    @Inject
    public customerService: CustomerService;
    public customerModel: Customer;


    @Inject
    public resMessage: ResponseMessage;

    @Inject
    demoBll: BLL.demo;

    constructor(customer: Customer) {
        super();
        //this.customerService = new CustomerService();
        //this.customer = customer;
    }

    async saveCustomer(reqMessage: RequestMessage) {
        let result;
        let customer = new Customer();


        this.customerModel = <Customer>reqMessage.requestObj;
      /*
        await CustomerEntity
            .build(this.customerModel)
            .save()
            .then(anotherTask => {
                console.info('save entity ' + JSON.stringify(anotherTask));
                // you can now access the currently saved task with the variable anotherTask... nice!
            })
            .catch(error => {
                // Ooops, do some error-handling
                console.error("Problem in save");
            });*/

        //let tranResult;

        //customer =<Customer> Utils.castObject(customer,this.customerModel);
        customer.name = "Rocky";
        customer.email = "trse.bgta@gmail.com";
        customer.phone = "011444776";


        await this.startTransaction();
        //this.createTransactionObject();
        result = await this.customerService.saveCustomerBasicInfo(customer);
        //this.destroyTransactionObject()
        await this.endTransaction();


        /* custom.name = "Prodip";
         custom.email = "prodip.bgta@gmail.com";
         custom.phone = "1225544444";*/

        //result= await this.customerService.saveCustomerBasicInfo(this.customerModel);
        /*

                let queryBuilder = this.getRawQueryBuilder(),buildSql;
                let whereCondition = this.customObject;
                whereCondition.id = 59;

                buildSql=queryBuilder('CustomerEntity').where(whereCondition).update(custom).toString();

                //appEvent.startTransaction();


                await this.customerService.transaction(custom);

                custom.name = "Tuli";
                custom.email = "tuli.bgta@gmail.com";
                custom.phone = "011444776";

                await this.customerService.transaction(custom);

                tranResult = await this.endTransaction();

                this.customerModel = <Customer> Utils.castObject(custom, reqMessage.requestObj);

                Utils.logger('property length' + Object.keys(this.customerModel).length);

                var properties = Object.keys(this.customerModel);
                for (let pro of properties) {
                    Utils.logger("ProName: " + pro);
                }

                Utils.logger("Customer object from Facade: " + this.customerModel);
        */


        //=  await this.customerService.saveCustomerBasicInfo(this.customerModel);

        /* let whereCondtion = this.customObject
         whereCondtion.id = 6;
         whereCondtion.name = 'Rocky';


         result = await this.demoBll.getOneByCondition(whereCondtion);*/

        this.resMessage.setMessage(result);
        this.resMessage.setResponseCode(200);
        this.resMessage.setResponseObject(this.customerModel);
        return this.resMessage;
    }

    async getAllCustomersByCondtion() {
        let whereCondition = {
            status: 1,
        };
        let allCustomer = await this.customerService.getAllCustomersByCondition(whereCondition, 'name');
        await this.resMessage.setResponseObject(allCustomer);
        return this.resMessage;
    }

    async getCustomers() {
        /* let whereCondition={
             status:1,
         }*/

        let allCustomer = await this.customerService.getAllCustomers();
        await this.resMessage.setResponseObject(allCustomer);
        return this.resMessage;
    }

    async updateCustomer(id: number, customer: Customer) {
        let message = await this.customerService.updateCustomer(id, customer);
        //console.log("From facade" +
        //    JSON.stringify(allCustomer, null, 2));
        return message;
    }

    async deleteCustomer(id: string) {
        let message = await this.customerService.deleteCustomer(id);
        //console.log("From facade" +
        //    JSON.stringify(allCustomer, null, 2));
        return message;
    }

}