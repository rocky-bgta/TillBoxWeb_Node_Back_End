import {Sequelize} from 'sequelize-typescript';
import {setting} from "./setting/setting";


export const dbConfig = {
    host: setting.POSTGRES_HOST_URL,
    port: +setting.POSTGRES_PORT,
    name: setting.POSTGRES_DATABASE_NAME,
    dialect: 'postgres',
    username: setting.POSTGRES_USER_NAME,
    password: setting.POSTGRES_PASSWORD,
    modelPaths: [
        __dirname + '/entities/startUp',
        __dirname + '/entities/accounting'],
    logging:  true, //false
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    },
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
        timestamps: true
    }
}

export const sequelize = new Sequelize(dbConfig);
