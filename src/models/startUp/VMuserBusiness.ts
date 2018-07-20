/**
 *Created By: Jafar Ulla
 *Created Date: 10/16/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */

import AccessRightModel from "./accessRightModel";
import VMUser from "./VMuser";


export default class VMUserBusiness {

    public vmUserList: Array<VMUser> ;
    public accessRightList: Array<AccessRightModel> ;

    constructor() {
        this.vmUserList =  new Array<VMUser>();
       this.accessRightList = new Array<AccessRightModel>();
    }
}