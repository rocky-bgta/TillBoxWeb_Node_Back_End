import Dao from "../../dataAccess/dao";
import * as Entities from "../../entities/startUp/index";
import UserRightMapperModel from "../../models/startUp/userBusinessRightMapperModel";
import UserModel from "../../models/startUp/userModel";
//import {Md5} from "ts-md5/dist/md5";
import * as  Enums from "../../core/enum/enums"
import UserInvitationModel from '../../models/startUp/userInvitationModel'
import UserVM from "../../models/startUp/VMuser";
import BaseBll from "../../core/abstractClass/baseBll";
import * as Models from "../../models/startUp";
import * as BLL from "../startUp";
import {Singleton} from "typescript-ioc";
import Utils from "../../utils/utils";
import {setting} from "../../setting/setting";

const crypto = require('crypto');
//const decipher = crypto.createDecipher('aes192', 'a password');

@Singleton
export default class UserBll extends BaseBll {
    dao: Dao;

    constructor() {
        super();
        this.dao = new Dao(Entities.user);
    }

    userBusinessRightMapperBll: BLL.userBusinessRightMapper = new BLL.userBusinessRightMapper();
    businessBll: BLL.business = new BLL.business();

    public async getUser(userModel: UserModel) {
        Utils.logger("User login object");
        let result = null, encryptedPassword = null, whereCondition;

        try {
            whereCondition = this.customObject;

            encryptedPassword = this.getEncryptPassword(userModel.password);  //Md5.hashStr(userModel.password).toString();
            whereCondition.userID = userModel.userID;
            whereCondition.password = encryptedPassword;
            result = await this.dao.getOneByCondition(whereCondition);
        } catch (err) {
            Utils.logger("getUser service Error", err);
            throw err;
        }
        return result;
    }

    public async saveUser(userModel: UserModel) {
        Utils.logger("User object to save");
        let result = null,
            encryptedPassword = null;
           /* userBusinessRightMapperModel = null,
            createdBusinessModel: Models.business = null;*/
        try {

            encryptedPassword = this.getEncryptPassword(userModel.password);
            //update user's password
            userModel.password = encryptedPassword;
            userModel.createdBy="System";
            userModel.updatedBy="System";
            result = await this.save(userModel);



            /*//uncommit this code to send email but need to make validation service
            /!*userModel.status = Enums.Status.Inactive;
            userModel = await this.dao.save(userModel);
            MailSender.mailSend(userModel.userID, 'TillboxWeb Registration confirm','url');*!/

            encryptedPassword = Md5.hashStr(userModel.password).toString();
            userModel.password = encryptedPassword;
            userModel.status = Enums.Status.Active;
            userModel.createdBy= userModel.userID;
            userModel.updatedBy=userModel.userID;
            userModel = await this.save(userModel);

            if (isCreateBusiness == false) {
                return userModel;
            }

            createdBusinessModel =
                await this.businessBll.createBusiness(
                    userModel.userID,
                    "123456789",
                    Enums.SubscriptionStatus.Active,
                    userModel.userID,
                    cellPhone,
                    surname
                );

            // map created new business with new user ID through userRightMapper table
            userBusinessRightMapperModel = new Models.userBusinessRightMapper();
            userBusinessRightMapperModel.userID = userModel.userID;
            userBusinessRightMapperModel.accessRightID = Enums.UserAccessRight.Administrator;
            userBusinessRightMapperModel.firstName = userModel.name;
            userBusinessRightMapperModel.lastName = userModel.surname;
            userBusinessRightMapperModel.businessID = createdBusinessModel.businessID;
            userBusinessRightMapperModel.createdBy = userModel.userID;
            userBusinessRightMapperModel.createdBy = userModel.userID;


            this.sleep(100);
            await this.userBusinessRightMapperBll.save(userBusinessRightMapperModel, 'save userBusinessRightMapper model');//saveUserMapper(userBusinessRightMapperModel);
*/

        } catch (err) {
            Utils.logger("user service sign up Error", err);
            throw err;
        }
        return result;
    }

    //check where this method is used ! this cant be replace as its return a boolean
    public async isUserExist(userID: string) {
        let result: boolean = false, userModel: Models.user;
        let whereCondition = this.customObject;
        whereCondition.userID = userID;
        try {
            userModel = await this.dao.getOneByCondition(whereCondition);
            if (userModel != null) {
                result = true;
            }
        } catch (err) {
            Utils.logger("user service isUserExist Error" + err);
            throw err;
        }
        return result;
    }


    public async createInviteUserFromUserInvitationToken(userInvitationTokenModel: UserInvitationModel): Promise<UserVM> {
        let userVM: UserVM = new UserVM();

        try {
            userVM.firstName = userInvitationTokenModel.firstName;
            userVM.lastName = userInvitationTokenModel.lastName;
            userVM.accessRightID = userInvitationTokenModel.accessRightID;
            userVM.userModel.userID = userInvitationTokenModel.userID;
            userVM.status = Enums.UserStatus.InvitedUser;
            userVM.tokenInvitation = userInvitationTokenModel.token;

        } catch (err) {
            Utils.logger('Error Log ', err);
            throw err;
        }
        return userVM;
    }

    public async createInviteUserFromUserRightMapperModel(userMappe: UserRightMapperModel): Promise<UserVM> {
        let userVM: UserVM = new UserVM();

        try {
            userVM.accessRightID = userMappe.accessRightID;
            userVM.firstName = userMappe.firstName;
            userVM.lastName = userMappe.lastName;
            userVM.userModel.userID = userMappe.userID;
            userVM.status = userMappe.status;

        } catch (err) {
            Utils.logger('Error log ', err);
            throw  err;
        }
        return userVM;
    }


    public getEncryptPassword(givenPassword:string): string {
        let encryptedPassword:string = null,
            secret:string = setting.USER_PASSWORD_SECRET;
        try {
            encryptedPassword = crypto.createHmac('sha256', secret)
                .update(givenPassword)
                .digest('hex');

        } catch (err) {
            Utils.logger('Error log ', err);
            throw  err;
        }
        return encryptedPassword;
    }


}