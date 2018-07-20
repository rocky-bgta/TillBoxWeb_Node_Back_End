import Dao from "../../dataAccess/dao";
import Util from "../../utils/utils";
import ForgetPasswordTokenModel from "../../models/startUp/forgetPasswordTokenModel";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class ForgetPasswordTokenBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.forgetPasswordToken);
    }

    public async generateForgetPasswordToken(userId: string) {
        let result = null, forgetPasswordTokenModel: ForgetPasswordTokenModel;
        try {
            forgetPasswordTokenModel = new ForgetPasswordTokenModel();
            forgetPasswordTokenModel.userID = userId;
            forgetPasswordTokenModel.token = Util.generateUniqueID();
            let date = new Date();
            date.setDate(date.getDate() + 2);
            forgetPasswordTokenModel.validation = date;
            result = await this.dao.save(forgetPasswordTokenModel);
        } catch (err) {
            Util.logger('Error log', err);
            throw err;
        }
        return result;
    }

    /*public async validateChangePasswordToken(requestedToken: string) {
        let result, whereCondition = this.customObject;
        Util.logger("verify change password token from ForgetPasswordTokenBll ", requestedToken);
        try {
            whereCondition.token = requestedToken;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Util.logger('Error Log', err);
            throw err;
        }
        return result;
    }*/
}