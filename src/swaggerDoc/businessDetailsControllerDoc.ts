/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/17/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import VMBusinessDetailsViewModel from "../models/startUp/VMbusinessDetails";

 export interface IGetAllRequestObj {
    businessID: number
}

 export class GetAllBusinessDetails{
    public token: string;
    public requestObj:IGetAllRequestObj;
    public businessID: number;
    public pageIndex: number = 0;
    public pageSize: number = 0;
}

 export class saveBusinessDetails{
     public token: string;
     public requestObj:VMBusinessDetailsViewModel;
     public businessID: number;
     public pageIndex: number = 0;
     public pageSize: number = 0;
 }

 export class updateBusinessDetails{
     public token: string;
     public requestObj:VMBusinessDetailsViewModel;
     public businessID: number;
     public pageIndex: number = 0;
     public pageSize: number = 0;
 }