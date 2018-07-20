/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/23/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BaseModel from "../../core/abstractClass/baseModel";

export default class AccessRightModel extends BaseModel {
    accessRightID: number;
    name: string;
    description: string;

    constructor() {
        super();
    }
}