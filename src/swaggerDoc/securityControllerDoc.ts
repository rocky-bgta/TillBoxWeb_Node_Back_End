/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/25/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */

export interface IAccessRightRoleMapping {
    accessRightID: number
}

export class getAllAccessRightRoleMapping {
    public token: string;
    public requestObj: IAccessRightRoleMapping;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}