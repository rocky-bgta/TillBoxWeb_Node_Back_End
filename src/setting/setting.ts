
import * as dotenv from 'dotenv'
dotenv.config({ path: "variables.env" });

export const setting = {
    NODE_SERVER_PORT:   process.env.NODE_SERVER_PORT,
    NODE_SERVER_HOST:   process.env.NODE_SERVER_HOST,
    POSTGRES_HOST_URL:  process.env.POSTGRES_HOST_URL,
    POSTGRES_PORT:      process.env.POSTGRES_PORT,
    POSTGRES_USER_NAME: process.env.POSTGRES_USER_NAME,
    POSTGRES_PASSWORD:  process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE_NAME: process.env.POSTGRES_DATABASE_NAME,
    MAIL_HOST:              process.env.MAIL_HOST,
    MAIL_PORT:              process.env.MAIL_PORT,
    MAIL_USER_NAME:         process.env.MAIL_USER_NAME,
    MAIL_PASSWORD:          process.env.MAIL_PASSWORD,
    QUERY_BUILDER_DIALECT:  process.env.QUERY_BUILDER_DIALECT,
    TOKEN_SECRET:           process.env.TOKEN_SECRET,
    USER_PASSWORD_SECRET:   process.env.USER_PASSWORD_SECRET,

    DB_CONN_STRING:         process.env.DATABASE_TYPE + "://"+
                            process.env.POSTGRES_USER_NAME+":"+
                            process.env.POSTGRES_PASSWORD +"@"+
                            process.env.POSTGRES_HOST_URL+":"+
                            process.env.POSTGRES_PORT+"/"+
                            process.env.POSTGRES_DATABASE_NAME,
};