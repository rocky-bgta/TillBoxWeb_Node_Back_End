/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/10/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import Util from "../../utils/utils";
import {sequelize} from "../../db";
import * as _ from 'lodash';
import Core from "./core";
import {QueryType} from "../enum/enums";
export default abstract class BaseDao extends Core {
    constructor() {
        super();
    }

    public async executeRawQuery(query: string, type:number):Promise<any>{
        let result=null,numType;
        try {

            if(type!=null)
                numType= _.toNumber(type);
            else
                throw Error;

            Util.logger("Dao executing raw query");
            if(numType==QueryType.Select) {
                await sequelize.query(query).then(rows => {
                    return result = rows[0];
                }).catch((err: any) => {
                    return result = null;
                });
            }else  if(numType==QueryType.SequenceGenerator) {
                await sequelize.query(query).then(rows => {
                    return result = rows[0][0].nextval;
                }).catch((err: any) => {
                    return result = null;
                });
            }
            else {
                await sequelize.query(query).spread((numberOfRows, metadata) => {
                    return result= numberOfRows;
                }).catch((err: any) => {
                    return result = null;
                });
            }
        } catch (err) {
            Util.logger('executing raw query exception Error Log', err);
            throw err;
        }
        return result;
    }
}