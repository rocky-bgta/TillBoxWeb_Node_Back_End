import Dao from "../../dataAccess/dao";
import Util from "../../utils/utils";
import * as BLL from "../startUp";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class ForgetPasswordBll extends BaseBll {
    public dao: Dao;
    //public forgetPasswordTokens: Models.forgetPassowrdToken[];

    //@Inject
    userBll: BLL.user = new BLL.user();

    //@Inject
    sessionBll: BLL.session = new BLL.session();

    constructor() {
        super();
        this.dao = new Dao(Entities.forgetPasswordToken);
    }

    public async validateUserId(givenUserId: string): Promise<boolean> {
        let result = null, existingUserObject: any = null, userId, whereCondition = this.customObject;
        Util.logger('validate userId ', givenUserId);
        try {
            Util.logger('validateUser method from userBll');
            whereCondition = new Object();
            whereCondition.userID = givenUserId;

            existingUserObject = await this.userBll.getOneByCondition(whereCondition, 'verify user');//verifyUserByEmail(givenUserId);

            if (existingUserObject != null) {
                userId = existingUserObject.userID;
            } else {
                throw existingUserObject;
            }
            if (givenUserId == userId) {
                result = true;
            } else {
                result = false;
            }
        } catch (err) {
            Util.logger('Error Log', err);
            throw  err;
        }
        return result;
    }

    /* public async validateToken(passwordToken: string): Promise<boolean> {
         let result, whereCondition = this.customObject;
         whereCondition.token = passwordToken;
         Util.logger('validateToken method from userBll');
         try {
             result = await this.dao.getOneByCondition(whereCondition);
         } catch (err) {
             Util.logger('Error Log', err);
             throw  err;
         }
         return result;
     }*/
}

