/**
 *Created By: Ayasha Siddiqua
 *Created Date: 11/10/17
 *Time: 10:34 AM
 *Modified By:
 *Modified Date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseBll from "../../core/abstractClass/baseBll";
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/accounting/index";
import {Singleton} from "typescript-ioc";
import * as Model from "../../models/accounting";
import Utils from "../../utils/utils";

@Singleton
export default class TaxCodeBll extends BaseBll {

    constructor() {
        super();
        this.dao = new Dao(Entities.taxCode);
    }

    public async isValidTaxCodeID(id: number) {
        let result: boolean = false, taxCodeModel: Model.taxCode, whereCondition = this.customObject;
        try {
            whereCondition.taxCodeID = id;
            taxCodeModel = await this.dao.getOneByCondition(whereCondition);

            if (taxCodeModel != null) {
                result = true;
            }
        } catch (err) {
            Utils.logger('Error log', err);
            throw err;
        }
        return result;
    }
}