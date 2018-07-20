/**
 *Author: Ayasha Siddiqua
 *Date: 11/3/17
 *Time: 11:14 AM
 */

//---------Common Example-----

export interface UserID {
    userID: string;
}

export class DocUserID {
    public token: string;
    public requestObj: UserID;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export interface UserIDPassword {
    userID: string;
    password: string;
}

export class DocUserIDPassword {
    public token: string;
    public requestObj: UserIDPassword;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export class DocGetList {
    public token: string;
    public requestObj: DocGetList;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export interface GetToken {
    token: string;
}

export class DocGetToken {
    public token: string;
    public requestObj: GetToken;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export interface BusinessID {
    businessID: number;
}

export class DocBusinessID {
    public token: string;
    public requestObj: BusinessID;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export class BusinessIDUserID {
    userID: string;
    businessID: number
}

export class DocBusinessIDUserID {
    public token: string;
    public requestObj: BusinessIDUserID;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//-------------User Module--------------

export interface SignUpReq {
    "userID": string;
    "name": string;
    "surname": string;
    "cellPhone": string;
    "password": string;
}

export class DocSignUpReq {
    public token: string;
    public requestObj: SignUpReq;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export interface EditUser {
    userId: string;
    firstName: string;
    lastName: string;
    accessRightId: number;
}

export class DocEditUser {
    public token: string;
    public requestObj: EditUser;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//----------Chance password module -----

export interface changePasswordReqObj {
    userID: string;
    password: string;
    newPassword: string;
}

export class DocChangePassword {
    public token: string;
    public requestObj: changePasswordReqObj;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//---------User Invite module------

export interface UserInvitationReqObj {
    userID: string;
    firstName: string;
    lastName: string;
    accessRightID: number;
}

export class DocUserInvitation {
    public token: string;
    public requestObj: UserInvitationReqObj;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//-----------User Role Module--------

export interface AddRoleReq {
    roleID: number;
    name: string;
    description: string;
}

export class DocAddRoleReq {
    public token: string;
    public requestObj: AddRoleReq;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//---------Business Module--------

export interface SaveBusiness {
    businessID: number;
    productTypeID: number;
    businessTypeID: string;
    businessName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export class DocSaveBusiness {
    public token: string;
    public requestObj: SaveBusiness;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//-----Business Details Module--------

export interface SaveCountry {
    countryId: number;
    countryCode: string;
    name: string;
}

export class DocSaveCountry {
    public token: string;
    public requestObj: SaveCountry;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export interface SaveFinancialYear {
    financialYearID: number;
    financialYearStart: number;
    financialYearEnd: number;
    openingBalanceDate: Date;
    lockmyDataAt: Date;
}

export class DocSaveFinancialYear {
    public token: string;
    public requestObj: SaveFinancialYear;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export interface SaveBusinessContact {
    businessContactID: number;
    businessID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    primaryContact: boolean;
}

export class DocSaveBusinessContact {
    public token: string;
    public requestObj: SaveBusinessContact;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//-----------GstSetting Module-----------

export interface UpdateGstSetting {
    userID: string;
    isRegistered: boolean;
    accountingBasic: number;
    reportingFrequency: number;
    selectedGstOption: number;
    selectedBasLodgement: number;
}

export class DocUpdateGstSetting {
    public token: string;
    public requestObj: UpdateGstSetting;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//----------PrivilegeMapping Module-----

export interface SavePrivilegeMapping {
    privilegeServiceMappingID: number;
    privilegeID: number;
    serviceURI: string;
}

export class DocSavePrivilegeMapping {
    public token: string;
    public requestObj: SavePrivilegeMapping;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//----------AccessRight Module--------
export interface SaveAccessRight {
    accessRightID: number;
    name: string;
    description: string;
}

export class DocSaveAccessRight {
    public token: string;
    public requestObj: SaveAccessRight;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

export interface GetAccessRightRoleMapping {
    accessRightID: number;
}


export class DocGetAccessRightRoleMapping {
    public token: string;
    public requestObj: GetAccessRightRoleMapping;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//------------Privilege Module---------

export interface SavePrivilege {
    privilegeID: number;
    parentID: number;
    actionCode: string;
    name: string;
    showName: string;
}

export class DocSavePrivilege {
    public token: string;
    public requestObj: SavePrivilege;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

//-------------Role Privilege Mapping----------

export interface SaveRolePrivilegeMapping {
    rolePrivilegeMappingID: number;
    roleID: number;
    privilegeID: number;
}

export class DocSaveRolePrivilegeMapping {
    public token: string;
    public requestObj: SaveRolePrivilegeMapping;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}
