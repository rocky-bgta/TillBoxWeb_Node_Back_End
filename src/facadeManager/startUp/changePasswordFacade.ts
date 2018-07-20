import RequestMessage from "../../core/requestMessage";
import Util from "../../utils/utils";
import {Inject} from "typescript-ioc";
import ResponseMessage from "../../core/responseMessage";
import {MessageConstant} from "../../core/messageConstant";
//import {Md5} from "ts-md5/dist/md5";
import * as BLL from "../../bllManager/startUp";
import BaseFacade from "../../core/abstractClass/baseFacade";
import * as Models from "../../models/startUp";

export default class ChangePasswordFacade extends BaseFacade {
    @Inject
    resMessage: ResponseMessage;

    @Inject
    sessionBll: BLL.session;

    @Inject
    userBll: BLL.user;

    constructor() {
        super();
    }

    async updateNewPassword(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        Util.logger('changePassword from facade ');
        let requestObj = null, oldPassword = null, newPassword = null, user: any = null;
        try {
            requestObj = reqMessage.requestObj;
            oldPassword = requestObj.password;
            newPassword = requestObj.newPassword;



            oldPassword = this.userBll.getEncryptPassword(oldPassword);//await Md5.hashStr(oldPassword).toString();

            whereCondition = new Object();
            whereCondition.userID = requestObj.userID;
            user = await this.userBll.getOneByCondition(whereCondition, 'verify userId');

            Util.logger('verifyUserByEmail result', user);

            if (user != null) {
                if (user.password != oldPassword) {
                    Util.logger('Wrong password!');
                    responseMessage = this.getResponseMessBuilder(MessageConstant.WRONG_USER_NAME_PASSWORD, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                } else {
                    newPassword = this.userBll.getEncryptPassword(newPassword);//await Md5.hashStr(newPassword).toString();

                    let result;

                    whereCondition = new Object();
                    whereCondition.userID = requestObj.userID;

                    let userModel: Models.user = new Models.user();
                    userModel.userID = requestObj.userID;
                    userModel.password = newPassword;

                    result = await this.userBll.updateByCondition(userModel, whereCondition, 'update password');
                    Util.logger('updated user password ', result);

                    if (result != null && !(result instanceof Error)) {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_PASSWORD_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_PASSWORD, null, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                }
            } else {
                Util.logger('Not a valid user !');
                responseMessage = this.getResponseMessBuilder(MessageConstant.NOT_A_VALID_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger('changePasswordFacade :: updateNewPassword Error log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_CHANGE_PASSWORD, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('changePasswordFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}
