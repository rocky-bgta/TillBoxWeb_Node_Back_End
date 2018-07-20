import Dao from "../../dataAccess/dao";
import Customer from "../../models/startUp/customerModel";
import * as Entities from "../../entities/startUp/index";
import {Singleton} from "typescript-ioc";
import {appEvent} from "../../core/global/appEvent";
import {QueryType} from "../../core/enum/enums";


@Singleton
export default class CustomerBll {

    public dao: Dao;
    public customers: Customer[];

    constructor() {
        this.dao = new Dao(Entities.customer);
    }

    async saveCustomerBasicInfo(customer: Customer) {
        customer.createdDate = new Date();
        customer.updatedDate = new Date();
        let result = await this.dao.save(customer);
        if (appEvent.transactionState == "Active")
            await this.dao.transaction(result, QueryType.Insert);
        //else
        //   await this.dao.save(customer);

        return result;
    }

    public async getAllCustomers() {
        this.customers = await this.dao.getAll();
        console.log("Get all Customer from customerService");

        return this.customers;
    }

    public async getAllCustomersByCondition(whereCondition: any, orderBy?: any) {
        this.customers = await this.dao.getAllByCondition(whereCondition, orderBy);
        console.log("Get all Customer from customerService");

        return this.customers;
    }

    public async updateCustomer(id: number, customer: Customer) {
        let message;
        let select = {
            status: 1,
            name: 'Rocky'
        };
        let where = {
            id: 8
        };
        /* myObj = new Object()
         myObj.key = value;
         myObj[key2] = value2;   // Alternative*/

        message = await this.dao.updateByCondition(select, where);
        return message;
    }

    public async deleteCustomer(id: string): Promise<any> {
        let message: any = null;
        // message = await this.dao.delete(id);
        return message;
    }

    public async transaction(model: object) {
        let test: string = appEvent.transactionState;
        if (test == "Active") {
            let message: any = null;
            message = await this.dao.transaction(model, 1);
            return message;
        }
    }

    //public async

}