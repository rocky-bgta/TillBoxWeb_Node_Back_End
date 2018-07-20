import Dao from "../../dataAccess/dao";
import SessionModel from "../../models/startUp/sessionModel";
import Util from "../../utils/utils";
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import Authentication from "../../security/authentication";
import * as BLL from "../startUp";
import UserRightMapperModel from "../../models/startUp/userBusinessRightMapperModel";
import TokenModel from "../../security/tokenModel";
import {Singleton} from "typescript-ioc";

@Singleton
export default class SessionBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.session);
    }

    //@Inject
    authentication: Authentication = new Authentication();

    //@Inject
    userBusinessRightMapperBll: BLL.userBusinessRightMapper = new BLL.userBusinessRightMapper();



    public async createUserSession(userId: string, businessID: number, businessDBName: string) {
        let whereCondition = this.customObject;
        try {
            let payload = this.customObject;
            whereCondition = new Object();
            whereCondition.userID = userId;
            let accessRight: UserRightMapperModel = await this.userBusinessRightMapperBll.getOneByCondition(whereCondition);//finedOne(userId);

            payload.userID = userId;
            payload.businessID = businessID;
            payload.businessDBName = businessDBName;
            if (accessRight != null && accessRight != undefined)
                payload.accessRight = accessRight.accessRightID;

            let tokenModel: TokenModel;
            tokenModel = await this.authentication.generateToken(payload);

            let sessionModel = new SessionModel();
            sessionModel.userID = userId;
            sessionModel.token = tokenModel.token; //Utils.generateUniqueID(); //

            sessionModel.refreshToken = await  this.authentication.getRefreshToken(tokenModel.token);//Utils.generateUniqueID();
            sessionModel.businessID = businessID;
            sessionModel.businessDBName = businessDBName;
            let date = new Date();
            sessionModel.start = date;
            date.setDate(date.getDay() + 2);
            sessionModel.end = date;
            sessionModel.duration = 2;
            sessionModel.loginStatus = 1;
            sessionModel.status = 1;
            await this.dao.save(sessionModel);
            return sessionModel;
        } catch (err) {
            Util.logger("sessionBll createUserSession  Error:  ", err);
            throw err;
        }
    }


    public async updateSession(sessionModel: SessionModel) {
        try {
            let result;
            let tokenModel: TokenModel, whereCondition = this.customObject;
            tokenModel= await this.generateToken(sessionModel);

            //update session token
            sessionModel.token = tokenModel.token; //Utils.generateUniqueID(); //
            sessionModel.refreshToken = await  this.authentication.getRefreshToken(tokenModel.token);//Utils.generateUniqueID();

            let date = new Date();
            sessionModel.start = date;
            date.setDate(date.getDay() + 2);
            sessionModel.end = date;
            sessionModel.duration = 2;
            sessionModel.loginStatus = 1;
            sessionModel.status = 1;

            whereCondition = new Object();
            whereCondition.sessionID = sessionModel.sessionID;

            result = await this.dao.updateByCondition(sessionModel,whereCondition);
            if(result!=null)
                return sessionModel;
            else
                return null;

        } catch (err) {
            Util.logger("sessionBll createUserSession  Error:  ", err);
            throw err;
        }
    }

   private async generateToken(sessionModel: SessionModel){
        let payload = this.customObject;
        let whereCondition = this.customObject;

        payload.userID = sessionModel.userID;
        payload.businessID = sessionModel.businessID;
        payload.businessDBName = sessionModel.businessDBName;

        whereCondition.userID = sessionModel.userID;
        let accessRight: UserRightMapperModel = await this.userBusinessRightMapperBll.getOneByCondition(whereCondition);//finedOne(userId);

        if (accessRight != null && accessRight != undefined)
            payload.accessRight = accessRight.accessRightID;

        let tokenModel: TokenModel;
        tokenModel = await this.authentication.generateToken(payload);

        return tokenModel;
    }
}