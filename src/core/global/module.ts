/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/16/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */

let stringBuilder = require("string-builder");
let knex = require('knex')({client: 'pg'});
import {setting} from '../../setting/setting';



let knexConnection = require('knex')({
    client: 'pg',
    version: '6.4.2',
    connection: {
        host : setting.POSTGRES_HOST_URL,
        user : setting.POSTGRES_USER_NAME,
        password : setting.POSTGRES_PASSWORD,
        database : setting.POSTGRES_DATABASE_NAME
    }
});
export const globalModule = {
    queryBuilder: knex,
    stringBuilder: stringBuilder,
    getKnexConnection: knexConnection
};