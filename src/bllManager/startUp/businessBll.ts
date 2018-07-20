import Dao from "../../dataAccess/dao";
import Utils from "../../utils/utils";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {sequelize} from "../../db";
import * as BLL from "../startUp";
import * as Models from "../../models/startUp"
import {Singleton} from "typescript-ioc";
import {QueryType} from "../../core/enum/enums";
import * as Enums from "../../core/enum/enums";

@Singleton
export default class BusinessBll extends BaseBll {
    dao: Dao;

    //@Inject
    private gstSettingsBll: BLL.gstSetting = new BLL.gstSetting();
    userBusinessRightMapperBll: BLL.userBusinessRightMapper = new BLL.userBusinessRightMapper();

    constructor() {
        super();
        this.dao = new Dao(Entities.business);
    }

    public async saveBusiness(businessModel: Models.business, userID: string) {
        let result: any = null, createdBusinessModel: Models.business, gstSettingsModel: Models.gstSetting;
        try {
            createdBusinessModel = await this.dao.save(businessModel);
            gstSettingsModel = new Models.gstSetting();
            gstSettingsModel.userID = userID;
            gstSettingsModel.businessID = createdBusinessModel.businessID;
            gstSettingsModel.createdBy = userID;
            gstSettingsModel.updatedBy = userID;


            await this.gstSettingsBll.save(gstSettingsModel, 'save gstSettingModel');//addGstSettings(gstSettingsModel);
            result = createdBusinessModel;
        } catch (err) {
            Utils.logger("businessBll save businessModel Error :  ", err);
            throw err;
        }
        return result;
    }

    /*
        public async getBusiness(businessId: number) {
            let result, whereCondition = this.customObject;
            try {
                whereCondition = new Object();
                whereCondition.businessID = businessId;
                result = await this.dao.getOneByCondition(whereCondition);
                Utils.logger('getBusiness model *****', result);
            } catch (err) {
                Utils.logger("BusinessBll getBusiness Error ", err);
                throw err;
            }
            return result;
        }

        public async isBusinessExist(businessName: string) {
            let result, whereCondition = this.customObject;
            Utils.logger("isBusinessExist check: ", businessName);
            try {
                whereCondition.businessName = businessName;
                result = await this.dao.getOneByCondition(whereCondition);
            } catch (err) {
                Utils.logger("businessBll isBusinessExist  Error ", err);
                throw err;
            }
            return result;
        }

        public async finedOne(columnName: string, id: any) {
            Utils.logger('Find one row method from business userBll');
            let result, whereCondition = this.customObject;
            try {
                whereCondition.businessID = id;
                result = await this.dao.getOneByCondition(whereCondition);
            } catch (err) {
                Utils.logger('Error Log', err);
                throw err;
            }
            return result;
        }
    */

    public async isValidBusinessID(businessId: number) {
        let result: boolean = false, businessModel: Models.business, whereCondition = this.customObject;
        try {
            whereCondition.businessID = businessId;
            businessModel = await this.dao.getOneByCondition(whereCondition);

            if (businessModel != null) {
                result = true;
            }
        } catch (err) {
            Utils.logger('businessBll isValidBusiness error', err);
            throw err;
        }
        return result;
    }

    public async democreateBusiness(userID: string, serialNo: string, subscriptionStatus: number, owner: string,
                                cellPhone:string,surname:string): Promise<any> {
        let result = null,
            DBName,
            createdBusinessModel: Models.business,
            gstSettingsModel,
            createdGstModel,
            dataBaseCreated: boolean = false;

        Utils.logger('createBusiness method from userBll');
        try {
            DBName = Utils.getDbNameByUserID(userID);

            // check if that database already exist

            let query = "SELECT datname FROM pg_database" +
                " WHERE datname = '" + DBName + "'";
            let isDatabaseExits = await this.dao.executeRawQuery(query, QueryType.Select);

            if (this.lodash.isEmpty(isDatabaseExits)) {
                this.sleep(100);
                dataBaseCreated = await Utils.createDataBase(sequelize, DBName);
                if (!dataBaseCreated)
                    throw  Error;
            }

            //let dbQuery = Utils.createDataBase(sequelize, DBName);
            //await this.rawQueryForTransaction(dbQuery);

            let businessModel = new Models.business();
            businessModel.businessName = DBName;
            businessModel.serialNo = serialNo;
            businessModel.businessDBName = DBName;
            businessModel.subscriptionStatus = subscriptionStatus;
            businessModel.owner = owner;
            //businessModel.businessID = await this.dao.getPrimaryKeyOfTable();
            businessModel.phone=cellPhone;
            businessModel.lastName=surname;
            businessModel.createdBy = userID;
            businessModel.updatedBy = userID;


            this.sleep(100);
            createdBusinessModel = await this.save(businessModel);
            //createdBusinessModel.businessID = await this.dao.getPrimaryKeyOfTable();

            gstSettingsModel = new Models.gstSetting();
            gstSettingsModel.userID = userID;
            gstSettingsModel.businessID = createdBusinessModel.businessID;
            gstSettingsModel.createdBy = userID;
            gstSettingsModel.updatedBy = userID;

            this.sleep(100);
            createdGstModel = await this.gstSettingsBll.save(gstSettingsModel, 'save gstSettingModel');//addGstSettings(gstSettingsModel);
            if (createdBusinessModel != null && createdGstModel != null)
                result = createdBusinessModel;
        } catch (err) {
            if (dataBaseCreated) {
                await Utils.dropDataBase(sequelize, DBName);
            }
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

    public async createBusiness(userModel:Models.user, serialNo: string,givenBusinessName:string=null): Promise<Models.business> {
        let result:Models.business=null,
            dbName=null,
            createdBusinessModel: Models.business=null,
            gstSettingsModel:Models.gstSetting=null,
            createdGstSettingsModel:Models.gstSetting=null,
            createdDataBase: boolean = false,
            userBusinessRightMapperModel:Models.userBusinessRightMapper=null,
            createdUserBusinessRightMapperModel:Models.userBusinessRightMapper=null;

        Utils.logger('createBusiness method from userBll');
        try {

            if(givenBusinessName==null)
                dbName = Utils.getDbNameByUserID(userModel.userID);
            else
                dbName = Utils.getDbNameByBusinessName(givenBusinessName);

            // check if that database already exist
            let query = "SELECT datname FROM pg_database" +
                " WHERE datname = '" + dbName + "'";
            let isDataBaseExist = await this.dao.executeRawQuery(query, QueryType.Select);

            if (this.lodash.isEmpty(isDataBaseExist)) {
                this.sleep(100);
                createdDataBase = await Utils.createDataBase(sequelize, dbName);
                if (!createdDataBase)
                    throw  Error;
            }

            let businessModel = new Models.business();
            if(givenBusinessName==null)
                businessModel.businessName = dbName;
            else
                businessModel.businessName = givenBusinessName;

            businessModel.serialNo = serialNo;
            businessModel.businessDBName = dbName;
            businessModel.subscriptionStatus = Enums.SubscriptionStatus.Active;
            businessModel.owner = userModel.userID;
            businessModel.phone=userModel.cellPhone;
            businessModel.lastName=userModel.surname;
            businessModel.createdBy = userModel.userID;
            businessModel.updatedBy = userModel.userID;

            this.sleep(100);
            createdBusinessModel = await this.save(businessModel);

            gstSettingsModel = new Models.gstSetting();
            gstSettingsModel.userID = userModel.userID;
            gstSettingsModel.businessID = createdBusinessModel.businessID;
            gstSettingsModel.createdBy = userModel.userID;
            gstSettingsModel.updatedBy = userModel.userID;

            this.sleep(100);
            createdGstSettingsModel = await this.gstSettingsBll.save(gstSettingsModel, 'save gstSettingModel');

            userBusinessRightMapperModel = new Models.userBusinessRightMapper();
            userBusinessRightMapperModel.userID = userModel.userID;
            userBusinessRightMapperModel.accessRightID = Enums.UserAccessRight.Administrator;
            userBusinessRightMapperModel.firstName = userModel.name;
            userBusinessRightMapperModel.lastName = userModel.surname;
            userBusinessRightMapperModel.businessID = createdBusinessModel.businessID;
            userBusinessRightMapperModel.createdBy = userModel.userID;
            userBusinessRightMapperModel.createdBy = userModel.userID;

            this.sleep(100);
            createdUserBusinessRightMapperModel = await this.userBusinessRightMapperBll.save(userBusinessRightMapperModel, 'save userBusinessRightMapper model');//saveUserMapper(userBusinessRightMapperModel);

            if (createdBusinessModel != null && createdGstSettingsModel != null && createdUserBusinessRightMapperModel!=null)
                result = createdBusinessModel;
            else
                result = null;
        } catch (err) {
            if (createdDataBase) {
                await Utils.dropDataBase(sequelize, dbName);
            }
            Utils.logger('Error Log', err);
            throw err;
        }
        return result;
    }

}