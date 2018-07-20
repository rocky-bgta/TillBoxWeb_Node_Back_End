/**
 * This is a demo operation to show how to use typescript-rest library.
 */
import {DELETE, GET, Path, PathParam, POST, PUT} from 'typescript-rest';
import CustomerFacade from "../../facadeManager/startUp/customerFacade";
import Customer from "../../models/startUp/customerModel";
import ResponseMessage from "../../core/responseMessage";
import RequestMessage from "../../core/requestMessage";
import {Inject} from "typescript-ioc";
import {Response, Tags} from 'typescript-rest-swagger';

@Tags('Customer (Author: Salahin)')
@Path('api/customer')
export class CustomerController {

    customerFacade: CustomerFacade;
    customer: Customer;

    @Inject
    resMessage: ResponseMessage;


    constructor() {
        this.customerFacade = new CustomerFacade(this.customer);
    }

    /**
     * save customer.
     * @param Customer
     * @return Customer
     */
    @Path('/save')
    @POST
    @Response<Customer>(200, 'Save Customer.')
    async saveCustomer(reqMessage: RequestMessage): Promise<ResponseMessage> {
        //Util.logger("Route save customer", reqMessage);
        await this.customerFacade.saveCustomer(reqMessage);
        this.resMessage.message = "SUCCESS";
        return this.resMessage;
    }

    /**
     * get all customers.
     *
     * @return Customer array
     */
    @Path('/get')
    @GET
    async getCustomers(): Promise<ResponseMessage> {
        let resMessage = await this.customerFacade.getCustomers();
        return resMessage.responseObj;
    }

    @Path('/getByCondition')
    @GET
    async getByCondition(): Promise<ResponseMessage> {
        let resMessage = await this.customerFacade.getAllCustomersByCondtion();
        return resMessage.responseObj;
    }

    /**
     * Update a customer entity's row.
     *
     * @return operation status.
     */
    @Path('/update/:id')
    @PUT
    @Response<Customer>(200, 'Update Customer.')
    async updateCustomers(@PathParam('id') id: number, customer: Customer): Promise<string> {
        console.log("Controller id: " + id + "Customer Object: " + JSON.stringify(customer, null, 2));
        let message = await this.customerFacade.updateCustomer(id, customer);
        console.log("From Controller" + JSON.stringify(message, null, 2));
        return "success";
    }

    /**
     * Delete a customer entity's row.
     *
     * @return operation status.
     */
    @Path('/delete/:id')
    @DELETE
    async deleteCustomers(@PathParam('id') id: string): Promise<string> {
        console.log("Controller id: " + id);
        let message = await this.customerFacade.deleteCustomer(id);
        //console.log("From Controller" +
        //   JSON.stringify(cus, null, 2));
        return message;
    }

}
