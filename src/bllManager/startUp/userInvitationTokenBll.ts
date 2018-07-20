/**
 *Author: Ayasha Siddiqua
 *Date: 10/10/17
 *Time: 10:58 AM
 */
import Dao from "../../dataAccess/dao";
import {default as UserInvitationModel} from "../../models/startUp/userInvitationModel";
import Util, {default as Utils} from "../../utils/utils";
import RequestMessage from "../../core/requestMessage";
import * as Enums from "../../core/enum/enums"
import * as Entities from "../../entities/startUp/index";
import BaseBll from "../../core/abstractClass/baseBll";
import {Singleton} from "typescript-ioc";

@Singleton
export default class UserInvitationTokenBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.userInvitation);
    }

    public async generateUserInviteToken(reqMessage: RequestMessage) {
        let result = null, userInvitationModel: UserInvitationModel = null;
        try {
            let reqObj;
            reqObj = reqMessage.requestObj;
            userInvitationModel = new UserInvitationModel();
            userInvitationModel.userID = reqObj.userID;
            userInvitationModel.businessID = reqMessage.businessID;
            userInvitationModel.firstName = reqObj.firstName;
            userInvitationModel.lastName = reqObj.lastName;
            userInvitationModel.accessRightID = reqObj.accessRightID;
            userInvitationModel.done = false;
            userInvitationModel.status = Enums.Status.Active;

            if (reqObj.token != null) {
                userInvitationModel.token = reqObj.token;
            } else {
                userInvitationModel.token = Util.generateUniqueID();
            }

            let date = new Date();
            date.setDate(date.getDate() + 1);
            userInvitationModel.expireDate = date;

            result = await this.dao.save(userInvitationModel);

        } catch (err) {
            Util.logger('User invitation token bll :: generate user invitation token Error ', err);
            throw err;
        }
        return result;
    }

    /*public async isValidInvitationToken(token: string) {
        let result, whereCondition;
        Util.logger(' isValidInvitationToken token');
        try {
            whereCondition = this.customObject;
            whereCondition.token = token;

            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Util.logger('User InvitationToken userBll Error', err);
            throw err;
        }
        return result;
    }*/

    public async getUserListPendingByBusinessId(businessID: string) {
        let result = null;
        try {
            /*let whereClause : string = "businessID : "+ businessID
                                        + ", done : false"
                                        + ", Status : " + Enums.Status.Active
                                        + ", "
                                        + " expireDate: { "
                                        + "  [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)";*/

            let whereClause: object;
            var dt = new Date();
            dt.setDate(dt.getDate() - 1);

            whereClause = {
                businessID: businessID,
                done: false,
                status: Enums.Status.Active,
                expireDate: {
                    $gte: dt
                }
            };
            result = await this.dao.getAllByCondition(whereClause);
            Utils.logger('getUserList pending by businessID ', result);
        }
        catch (err) {
            Util.logger("user mapper userBll :  get user mapper by businessID Error: ", err.message);
            throw err;
        }
        return result;
    }

    /*   public async removeInvitation(token: string) {
           let result;
           try {
               let whereCondition = this.customObject;
               whereCondition.token = token;
               result = await this.dao.deleteByCondition(whereCondition);
           } catch (err) {
               Util.logger("user invite userBll Remove invitation Error: ", err);
               throw err;
           }
           return result;
       }

       public async updateUserInvitationToken(model: object, whereCondition: object) {
           let result;
           try {
               result = await this.dao.updateByCondition(model, whereCondition);
           } catch (err) {
               Util.logger("user mapper userBll :  get user mapper by businessID Error: ", err.message);
               throw err;
           }
           return result;
       }

       public async findAllInvitation(userId: string, businessId: number) {
           let result;
           let whereClause: object;
           whereClause = {
               userID: userId,
               businessID: businessId
           };
           try {
               result = await this.dao.getAllByCondition(whereClause);
           } catch (err) {
               Util.logger('user invitation token userBll : get all invitation by userId', err.Message);
           }
           return result;
       }*/
}