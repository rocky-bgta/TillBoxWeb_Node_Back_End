import Dao from "../../dataAccess/dao";
import Utils from "../../utils/utils";
import * as Enums from "../../core/enum/enums"
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class UserBusinessRightMapperBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.userBusinessRightMapper);
    }

/*
    public async saveUserMapper(userBusinessRightMapperModel: UserBusinessRightMapperModel) {
        let result;
        try {
            result = await this.dao.save(userBusinessRightMapperModel);
        } catch (err) {
            Utils.logger("userBusinessRightMapperBll  saveUserMapper Error", err);
            throw err;
        }
        return result;
    }

    public async updateUserMapper(model: object, whereCondition: object) {
        let result;
        try {
            result = await this.dao.updateByCondition(model, whereCondition);
        } catch (err) {
            Utils.logger('userBusinessRightMapperBll updateUserMapper Error ', err);
            throw err;
        }
        return result;
    }

    public async getUserMapper(userId: string) {
        let result, whereCondition = this.customObject;
        try {
            whereCondition = new Object();
            whereCondition.userID = userId;

            result = await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Utils.logger("user mapper userBll getUserMapper Error ", err);
            throw err;
        }
        return result;
    }

    public async finedOne(userId: string) {
        let result, whereCondition = this.customObject;
        try {
            whereCondition.userID = userId;

            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger("user mapper userBll getUserMapper Error ", err);
            throw err;
        }
        return result;
    }

    public async getUserMapperByBusinessId(businessID: number) {
        let result, whereCondition = this.customObject;
        try {
            whereCondition.businessID = businessID;
            result = await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Utils.logger("get user mapper by businessID Error from bll: ", err);
            throw err;
        }
        return result;
    }


    public async getAccessRightByBusinessID(businessID: number, userID: string) {
        let result, whereCondition = this.customObject;
        try {
            whereCondition.businessID = businessID;
            whereCondition.userID = userID;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger("user mapper userBll Error: ", err);
            throw err;
        }
        return result;
    }
*/

    //used**
   /* public async getUserMapperListActiveAndInactiveByBusinessId(businessID: number): Promise<UserBusinessRightMapperModel[]> {
        let result: UserBusinessRightMapperModel[], whereCondition = this.customObject;
        try {
            /!* let whereClause: object;
             whereClause = {
                 businessID: businessID,
                 status: [Enums.Status.Active, Enums.Status.Inactive]
             }*!/
            whereCondition.businessID = businessID;
            whereCondition.status = [Enums.Status.Active, Enums.Status.Inactive];

            result = await this.dao.getAllByCondition(whereCondition);
        } catch (err) {
            Utils.logger("user mapper userBll :  get user mapper by businessID Error ", err);
            throw err;
        }

        return result;
    }
*/
    /*public async isValidUserWithBusinessId(userId: string, businessId: number) {
        let result, whereCondition = this.customObject;
        try {
            whereCondition.userID = userId;
            whereCondition.businessID = businessId;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger('userRightMapperService isValidUserWithBusinessId ERROR !', err);
            throw err;
        }
        return result;
    }*/

    //used
    public async activateUser(userId: string, businessID: number) {
        let result, userRightMapperModel;
        let status: number = Enums.Status.Active;
        let whereCondition = this.customObject;
        try {
            whereCondition.userID = userId;
            whereCondition.businessID = businessID;

            // get the model and change status
            userRightMapperModel = await this.dao.getOneByCondition(whereCondition);
            userRightMapperModel.status = status;

            result = await this.dao.updateByCondition(userRightMapperModel, whereCondition);
            Utils.logger('activate user response : ', result);
            if (result != null) {
                return true;
            }
        } catch (err) {
            Utils.logger('userBll activateUser Error ', err);
            throw err;
        }
        return false;
    }

    public async InactivateUser(userId: string, businessID: number) {
        let result, userBusinessRightMapperModel;
        let whereCondition = this.customObject;
        let status: number = Enums.Status.Inactive;

        try {
            whereCondition.userID = userId;
            whereCondition.businessID = businessID;

            // get the model and change status
            userBusinessRightMapperModel = await this.dao.getOneByCondition(whereCondition);
            userBusinessRightMapperModel.status = status;

            result = await this.dao.updateByCondition(userBusinessRightMapperModel, whereCondition);
            Utils.logger('Inactivate user response : ', result);
            if (result != null) {
                return true;
            }
        } catch (err) {
            Utils.logger('userBll Inactivate User Error ', err);
            throw err;
        }
        return false;
    }
}