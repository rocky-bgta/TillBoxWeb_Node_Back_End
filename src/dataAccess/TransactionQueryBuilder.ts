/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 11/12/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import Core from "../core/abstractClass/core";
import {QueryType} from "../core/enum/enums";

export default class TransactionQueryBuilder extends Core {

    public buildQueryString: string = '';
    private endQuery: string = '';

    being() {
        this.endQuery += 'BEGIN;'
    }

    end() {
        this.endQuery += 'COMMIT;'
    }

    async buildQuery(model: any, tableName: string, operationType: number, whereCondition?:object) {
        let queryBuilder = this.getRawQueryBuilder();

        if (operationType == QueryType.Insert) {
            this.buildQueryString = queryBuilder(tableName).insert(model).toString();
        }
        if (operationType == QueryType.Update) {
            this.buildQueryString = queryBuilder(tableName).where(whereCondition).update(model).toString();
        }
        if (operationType == QueryType.Delete) {
            //this.buildQueryString = queryBuilder(tableName).update(model).toString();
        }
        if (operationType == QueryType.Raw) {
            //there model mean raw query string
            this.buildQueryString = model;
        }

        // append query
        this.endQuery += ' ' + this.buildQueryString + '; ';
        //Utils.logger(this.endQuery);

    }

    getBuildQuery() {
        return this.endQuery;
    }

}