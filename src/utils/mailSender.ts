/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/11/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import {setting} from '../setting/setting';
import Util from './utils';
let nodeMailer = require('nodemailer');

export default class MailSender {

    //let fileContent:any;

    static mailSend(mailTo: string, mailSubject:string, mailBody: string){
        //let result;
        try {
            // Setup mail transporter
            let sender = setting.MAIL_USER_NAME;
            let transporter = nodeMailer.createTransport({
                host: setting.MAIL_HOST,
                port: +setting.MAIL_PORT,
                secure: false,
                auth: {
                    user: setting.MAIL_USER_NAME,
                    pass: setting.MAIL_PASSWORD
                }
            });

            let mailOption = {
                from: ` TillBoxWeb<${sender}>`,
                to: mailTo,
                subject: mailSubject,
                text: mailBody
            };
            //const promiseSendMail = promisify(transporter.sendMail,transporter);
            //promiseSendMail(mailOption);

            return transporter.sendMail(mailOption);
            //return promiseSendMail;

        } catch (err) {
            Util.logger('Mail sending error', err);
        }
    }
}