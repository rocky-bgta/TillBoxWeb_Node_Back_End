import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index"
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class CountryBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.country);
    }

/*     async saveCountry(country: Models.country) {
         let result;
         Utils.logger('saveCountry method from service');
         try {
             result = await this.dao.save(country);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }

    public async getAllCountries() {
        let result;
        try {
            Utils.logger('getAllCountries method from service');
            setTimeout(async () => {
                result = await this.dao.getAll();
            }, 1000);

        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async updateCountry(id: number, countryModel: Models.country) {
        Utils.logger('updateCountry method from service');
        let result;
        let whereCondition = this.customObject;
        try {
            whereCondition.countryID = id;
            result = await this.dao.updateByCondition(countryModel, whereCondition);
        } catch (err) {
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

     public async deleteCountry(id: string) {
         Utils.logger('deleteCountry method from service');
         let result;
         try {
             result = await this.dao.delete(id);
         } catch (err) {
             Utils.logger('Error Log', err);
             throw err;
         }
         return result;
     }*/

}