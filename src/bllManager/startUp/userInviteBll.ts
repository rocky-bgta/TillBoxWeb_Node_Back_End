/**
 *Author: Ayasha Siddiqua
 *Date: 10/5/17
 *Time: 4:41 PM
 */
import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class UserInviteBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.userBusinessRightMapper);
    }

    /*    public async checkDuplicateUser(businessId: string, userId: string) {
            let whereCondition = this.customObject, result;
            try {
                whereCondition.businessID = userId;
                whereCondition.userID = userId;
                result = await this.dao.getOneByCondition(whereCondition);
            } catch (err) {
                Utils.logger('CheckDuplicate User from userInviteBll ', err);
                throw  err;
            }
            return result;
        }*/
}