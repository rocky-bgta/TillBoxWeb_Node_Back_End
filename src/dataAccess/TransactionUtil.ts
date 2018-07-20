/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/11/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import Util from "../utils/utils";
import {sequelize} from "../db";


export default class TransactionUtil {

    private entities: any[];
    private models: any[];

    constructor(entities: any[] ,models: any[]){
        this.entities = entities;
        this.models = models;
    }

    async  transactionSave() {
        let promiseArray: any[]= new Array<any>();
        let returnModels: any[]= new Array<any>();

        if (this.entities.length != this.models.length)
            return 'Length not equal';
        try {
            Util.logger('Start Transaction');
            let length = this.entities.length;

          await sequelize.transaction( (t) =>{
                for (let i = 0; i < length; i++) {
                    let model = this.models[i];
                    let entity = this.entities[i];

                    returnModels[model.constructor.name] = entity.build(model);
                    promiseArray[i]= entity.create(model, {transaction: t})

                }
               return  Promise.all(promiseArray).then(() => {
                   // t.commit();
                    return returnModels;
                }).catch((err: any) => {
                    return t.rollback();
                });
            });
        }
        catch (err) {
            Util.logger("Error",err);
        }

        return returnModels;
    }
}
