/**
 *Author: Ayasha Siddiqua
 *Date: 10/10/17
 *Time: 10:45 AM
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class UserInvitationModel extends BaseModel {
    userInvitationEntityID: number;
    userID: string;
    firstName: string;
    lastName: string;
    token: string;
    businessID: number;
    accessRightID: number;
    expireDate: Date;
    done: boolean;

    constructor() {
        super();
    }
}