import RequestMessage from "../../core/requestMessage";
import Util from "../../utils/utils";
import ResponseMessage from "../../core/responseMessage";
import {MessageConstant} from "../../core/messageConstant";
import MailSender from "../../utils/mailSender";
//import {Md5} from "ts-md5/dist/md5";
import * as BLL from "../../bllManager/startUp";
import * as Models from "../../models/startUp"
import BaseFacade from "../../core/abstractClass/baseFacade";

export default class ForgetPasswordFacade extends BaseFacade {

    forgetPasswordBll: BLL.forgetPassword = new BLL.forgetPassword();
    forgetPasswordTokenBll: BLL.forgetPasswordToken = new BLL.forgetPasswordToken();
    userBll: BLL.user = new BLL.user();
    sessionBll: BLL.session = new BLL.session();

    constructor(forgetPassword: Models.forgetPassowrdToken) {
        super();
        this.forgetPasswordBll = new BLL.forgetPassword;
    }

    async validateUser(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let responseMessage: ResponseMessage = null;
        Util.logger('validateUser method from facade');

        let userId = reqMessage.requestObj.userID;
        let forgetPasswordToken: Models.forgetPassowrdToken = null;
        try {
            let message;
            message = await this.forgetPasswordBll.validateUserId(userId);
            Util.logger('validateUserId result ', message);

            if (!message) {
                Util.logger('Invalid userID !!!!!!!!!!!');
                responseMessage = this.getResponseMessBuilder(MessageConstant.UNAUTHORIZED_USER, reqMessage.requestObj, MessageConstant.UNAUTHORIZED_CODE, null, reqMessage.businessID);
                return responseMessage;
            } else {
                Util.logger('Generate forgetPasswordToken !!!!!');

                let buildUrl, token = null;
                forgetPasswordToken = await this.forgetPasswordTokenBll.generateForgetPasswordToken(userId);
                token = forgetPasswordToken.token;

                buildUrl = `http://10.200.10.241:7575/resetPassword/${token}`;
                MailSender.mailSend(forgetPasswordToken.userID, 'Mail From TillboxWeb[Forget password]', buildUrl);
                responseMessage = this.getResponseMessBuilder(MessageConstant.MAIL_SEND_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger('forgetPasswordFacade :: validateUser Error Log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.NOT_A_VALID_USER, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('forgetPasswordFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }

    async changePassword(reqMessage: RequestMessage): Promise<ResponseMessage> {
        let responseMessage: ResponseMessage = null, whereCondition = this.customObject;
        Util.logger('changePassword method from facade');
        try {
            let reqObj, passwordToken, result: any;

            reqObj = reqMessage.requestObj;
            passwordToken = reqObj.token;

            whereCondition = new Object();
            whereCondition.token = passwordToken;

            result = await this.forgetPasswordBll.getOneByCondition(whereCondition, 'validate Token');
            Util.logger('validateToken result is ', result);

            if (result != null && !(result instanceof Error)) {
                let validationDate;
                validationDate = result.validation;

                let isValid, currentDate;
                currentDate = new Date();

                isValid = validationDate.getTime() > currentDate.getTime();
                Util.logger('requested userId : ' + result.userID);

                if (isValid) {
                    Util.logger("valid user and valid forget password token!!  new password: ", reqObj.password);
                    let newPassword: string = this.userBll.getEncryptPassword(reqObj.password);  //Md5.hashStr(reqObj.password).toString();
                    Util.logger("user new password: ", newPassword);

                    whereCondition = new Object();
                    whereCondition.userID = result.userID;

                    let userModel: Models.user = new Models.user();
                    userModel.userID = result.userID;
                    userModel.password = newPassword;

                    let message = await this.userBll.updateByCondition(userModel, whereCondition, 'message');
                    Util.logger('updated result is ', message);

                    if (message) {
                        Util.logger("updated successfully!");
                        responseMessage = this.getResponseMessBuilder(MessageConstant.SAVE_PASSWORD_SUCCESSFULLY, null, MessageConstant.SUCCESS_CODE, null, reqMessage.businessID);
                    } else {
                        responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_SAVE_PASSWORD, null, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
                    }
                } else {
                    Util.logger('Invalid token or Expire date gone ! ');
                    responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.INVALID_TOKEN_CODE, null, reqMessage.businessID);
                }
            } else {
                Util.logger('Not a valid token !!');
                responseMessage = this.getResponseMessBuilder(MessageConstant.INVALID_TOKEN, reqMessage.requestObj, MessageConstant.INVALID_TOKEN_CODE, null, reqMessage.businessID);
            }
        } catch (err) {
            Util.logger('forgetPasswordFacade :: changePassword Error log', err);
            responseMessage = this.getResponseMessBuilder(MessageConstant.FAILED_TO_CHANGE_PASSWORD, reqMessage.requestObj, MessageConstant.FAILED_ERROR_CODE, null, reqMessage.businessID);
            await this.exceptionLogSave('forgetPasswordFacade', reqMessage.requestObj, err);
        }
        return responseMessage;
    }
}
