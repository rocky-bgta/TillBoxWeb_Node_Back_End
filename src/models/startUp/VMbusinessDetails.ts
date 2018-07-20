/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/6/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
import BusinessDetailsModel from "./businessDetailsModel";
import BusinessContactModel from "./businessContactModel";
import AddressModel from "./addressModel";
import BusinessModel from "./businessModel";

export default class VMBusinessDetailsViewModel {

    public businessDetails: BusinessDetailsModel;
    public businessAddressList: AddressModel[];
    public businessContact: BusinessContactModel;
    public business: BusinessModel;

    constructor() {
    }
}
