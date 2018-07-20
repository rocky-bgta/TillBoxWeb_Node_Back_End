/**
 *Created By: Jafar Ulla
 *Created date: 12/10/17
 *Modified By :
 * Modified date :
 * @(CopyRight) Nybsys ltd.
 */
import UserModel from "./userModel";
import AccessRightModel from "./accessRightModel";

export default class VMUser {

    public accessRightID: number;
    public firstName: string;
    public lastName: string;
    public  status : number;
    public tokenInvitation: string;
    public userModel: UserModel;
    public isBusinessOwner : boolean = false;
    public accessRightList: Array<AccessRightModel> = new Array<AccessRightModel>();

    constructor() {
       this.userModel = new UserModel();
    }
}