/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/21/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
export const MessageConstant = {

    //---------Common MessageConstant----------

    INVALID_REQUEST: 'Invalid Request',
    NOT_A_VALID_USER: 'Not a Valid User',

    DUPLICATE_USER: 'Duplicate User',

    INVALID_DATA: 'Invalid Data',
    ACCESS_DENY: 'Access Permission Required',

    NO_CONTENT: 'No Content',
    NO_CONTENT_CODE: 204,

    PARTIAL_CONTENT: 'Partial Content',
    PARTIAL_CONTENT_CODE: 206,

    SUCCESS: 'Success',
    SUCCESS_CODE: 200,

    REDIRECT: 'Redirect Page',
    REDIRECT_CODE: 302,

    FAILED: 'Not Found',
    FAILED_ERROR_CODE: 404,

    BAD_REQUEST: 'Bad Request',
    BAD_REQUEST_CODE: 400,

    PAYMENT_REQUIRED: 'Payment Required',
    PAYMENT_REQUIRED_CODE: 402,

    FORBIDDEN: 'Forbidden',
    FORBIDDEN_CODE: 403,

    REQUEST_TIMEOUT: 'Request Timeout',
    REQUEST_TIMEOUT_CODE: 408,

    CONFLICT: 'Conflict',
    CONFLICT_CODE: 409,

    LOCKED: 'Locked',
    LOCKED_CODE: 423,

    TOO_MANY_REQUESTS: 'Too Many Request',
    TOO_MANY_REQUESTS_CODE: 429,

    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    INTERNAL_SERVER_ERROR_CODE: 500,

    NOT_IMPLEMENTED_ERROR: 'Not Implemented Error',
    NOT_IMPLEMENTED_ERROR_CODE: 501,

    SERVICE_UNAVAILABLE_ERROR: 'Service Unavailable Error',
    SERVICE_UNAVAILABLE_ERROR_CODE: 503,

    UNAUTHORIZED_USER: 'Unauthorized',
    UNAUTHORIZED_CODE: 401,

    SUSPENDED: 'Suspended',
    WRONG_USER_NAME_PASSWORD: 'User Name Or Password Does not Matched',

    EMAIL_NOT_FOUND: 'Email Not Found',

    INVALID_TOKEN: 'Invalid Token',
    INVALID_TOKEN_CODE: 400,

    INACTIVE: 'Inactive',

    USER_NOT_FOUND: 'User Not Found',

    OPERATION_FAILED: 'Operation Failed',

    MAIL_SEND_SUCCESSFULLY: 'Mail Send Successfully',

    NO_CHANGE_FOUND_IN_UPDATE: 'No change found in update',


    //--------USER SIGN UP--------------

    SIGN_UP_SUCCESSFULLY: 'Sign Up Successfully',
    FAILED_TO_SIGN_UP: 'Failed To Sign Up',


    //---------User Login----------------

    SUCCESSFULLY_LOGIN: 'Successfully Login',
    FAILED_TO_LOGIN: 'Failed To Login',


    //---------User List-------------------

    GET_USER_LIST_SUCCESSFULLY: 'Get User List Successfully',
    FAILED_TO_GET_USER_LIST: 'Failed To Get User List',


    //---------Change Password----------------

    SAVE_PASSWORD_SUCCESSFULLY: 'Password Save Successfully',
    FAILED_TO_SAVE_PASSWORD: 'Failed To Save Password',

    FAILED_TO_CHANGE_PASSWORD: 'Failed To Change Password',


    //---------Invite User----------------

    INVITE_USER_SUCCESSFULLY: 'Invite User Successfully',
    FAILED_TO_SEND_USER_INVITE: 'Failed To Invite User',

    //---------Reinvite User----------------

    REINVITE_USER_SUCCESSFULLY: 'Reinvite User Successfully',
    FAILED_TO_REINVITE_USER: 'Failed To Reinvite User',

    //-----------Remove Invitation------------

    REMOVE_INVITATION_SUCCESSFULLY: 'Remove Invitation Successfully',
    FAILED_TO_REMOVE_INVITATION: 'Failed To Remove Invitation',

    //---------Business----------------

    INVALID_BUSINESSID: 'Invalid BusinessID',
    ALREADY_USER_WITH_BUSINESSID: 'Already Business With BusinessID',

    SAVE_BUSINESS_SUCCESSFULLY: 'Save Business Successfully',
    FAILED_TO_SAVE_BUSINESS: 'Failed To Save Business',

    BUSINESS_SELECT_SUCCESSFULLY: 'Business Select Successfully',
    FAILED_TO_SELECT_BUSINESS: 'Failed To Select Business',

    BUSINESSID_REQUIRED: 'BusinessID Required',

    GET_ALL_BUSINESS_OPTION_SUCCESSFULLY: 'Get All Business Options Successfully',
    FAILED_TO_GET_ALL_BUSINESS_OPTION: 'Failed To Get All Business Option',

    SAVE_BUSINESS_CONTACT_SUCCESSFULLY: 'Business Contact Save Successfully',
    FAILED_TO_SAVE_BUSINESS_CONTACT: 'Failed To Save Business Contact',

    GET_ALL_BUSINESS_CONTACTS: 'Get All Business Contacts',
    FAILED_TO_GET_BUSINESS_CONTACTS: 'Failed To Get Business Contacts',

    GET_ALL_BUSINESS_DETAILS: 'Get All Business Details',
    FAILED_TO_GET_BUSINESS_DETAILS: 'Failed To Get Business Details',

    GET_ALL_BUSINESS_ADDRESS_LIST: 'Get All Business Address List',
    FAILED_TO_GET_BUSINESS_ADDRESS_LIST: 'Failed To Get Business Address List',

    GET_ALL_BUSINESS: 'Get All Business Address',
    FAILED_TO_GET_BUSINESS: 'Failed To Get Business Address',

    SAVE_BUSINESS_DETAILS_SUCCESSFULLY: 'Business Details Save Successfully',
    FAILED_TO_SAVE_BUSINESS_DETAILS: 'Failed To Save Business Details',

    UPDATE_BUSINESS_DETAILS_SUCCESSFULLY: 'Business Details Update Successfully',
    FAILED_TO_UPDATE_BUSINESS_DETAILS: 'Failed To Update Business Details',

    FAILED_EXPECTATION_CODE: 417,
    GET_ALL_BUSINESS_DETAILS_SUCCESSFULLY: 'All Business Details',

    //------------Invitation Token--------------

    SAVE_TOKEN_SUCCESSFULLY: 'Token Save Successfully',
    FAILED_TO_GENERATE_TOKEN: 'Failed To Save Token',

    INVALID_INVITATION_TOKEN: 'Invalid Invitation Token',

    //---------Role----------------

    ROLE_ID_REQUIRED: 'RoleID Required',

    SAVE_ROLE_SUCCESSFULLY: 'Role Save Successfully',
    FAILED_TO_SAVE_ROLE: 'Failed To Save Role',

    UPDATE_ROLE_SUCCESSFULLY: 'Role Update Successfully',
    FAILED_TO_UPDATE_ROLE: 'Failed To Update Role',

    GET_ROLE_LIST_SUCCESSFULLY: 'Get Role List Successfully',
    FAILED_TO_GET_ROLE_LIST: 'Failed To Get Role List',

    SUCCESSFULLY_CREATE_BUSINESS: 'Successfully Create Business',
    FAILED_TO_CREATE_BUSINESS: 'Failed To Create Business',

    //--------------Update user---------------

    UPDATE_USER_SUCCESSFULLY: 'User Update Successfully',
    FAILED_TO_UPDATE_USER: 'Failed To Update User',

    NO_GST_SETTINGS_FOUND: 'No Gst Settings Found',

    //---------------Privilege Role----------------

    SAVE_PRIVILEGE_ROLE_SUCCESSFULLY: 'Save Privilege Role Successfully',
    FAILED_TO_SAVE_PRIVILEGE_ROLE: 'Failed To Save Privilege Role',

    //----------------Role Mapping-----------------

    GET_ALL_ROLE_MAPPING: 'Get All Role Mapping',
    FAILED_TO_GET_ALL_ROLE_MAPPING: 'Failed To Get All Role Mapping',

    GET_ALL_MAPPING: 'Get All Mapping',
    FAILED_TO_GET_ALL_MAPPING: 'Failed To Get All Mapping',

    //--------------Country--------------------------

    SAVE_COUNTRY_SUCCESSFULLY: 'Country Save Successfully',
    FAILED_TO_SAVE_COUNTRY: 'Failed To Save Country',

    GET_ALL_COUNTRIES: 'Get All Countries',
    FAILED_TO_GET_COUNTRIES: 'Failed To Get Countries',

    //-------------------Financial Year---------------

    SAVE_FINANCIAL_YEAR_SUCCESSFULLY: 'Financial Year Save Successfully',
    FAILED_TO_SAVE_FINANCIAL: 'Failed To Save Financial Year',

    GET_ALL_FINANCIAL_YEARS: 'Get All Financial Years',
    FAILED_TO_GET_FINANCIAL_YEARS: 'Failed To Get Financial Years',


    //-------------------AccessRight------------------

    SAVE_ACCESS_RIGHT_SUCCESSFULLY: 'Access Right Save Successfully',
    FAILED_TO_SAVE_ACCESS_RIGHT: 'Failed To Access Right',

    UPDATE_ACCESS_RIGHT_SUCCESSFULLY: 'Access Right Update Successfully',
    FAILED_TO_UPDATE_ACCESS_RIGHT: 'Failed To Update Access Right',

    GET_ALL_ACCESS_RIGHT: 'Get All Access Rights',
    FAILED_TO_GET_ACCESS_RIGHT: 'Failed To Get Business Details',

    //-----------------Privilege Service Mapping---------------

    SAVE_PRIVILEGE_SERVICE_MAPPING_SUCCESSFULLY: 'Privilege Service Mapping Save Successfully',
    FAILED_TO_SAVE_PRIVILEGE_SERVICE_MAPPING: 'Failed To Save Privilege Service Mapping',

    UPDATE_PRIVILEGE_SERVICE_MAPPING_SUCCESSFULLY: 'Update Privilege Service Mapping Successfully',
    FAILED_TO_UPDATE_PRIVILEGE_SERVICE_MAPPING: 'Failed To Update Privilege Service Mapping',

    GET_ALL_PRIVILEGE_SERVICE_MAPPING_SUCCESSFULLY: 'Get All Privilege Service Mapping Successfully',
    FAILED_TO_GET_ALL_PRIVILEGE_SERVICE_MAPPING: 'Failed To Get All Privilege Service Mapping',

    //---------------User Active----------------------

    USER_ACTIVATE_SUCCESSFULLY: 'User Activate Successfully',
    FAILED_TO_ACTIVATE_USER: 'Failed To Activate User',
    FAILED_TO_INACTIVATE_USER: 'Failed To Inactivate User',

    ONLY_OWNER_CAN_INACTIVE_USER: 'Only Business Owner Can Inactivate User',
    INACTIVATE_USER_SUCCESSFULLY: 'Inactivate User Successfully',

    NO_BUSINESS_FOUND: 'No Business Found',
    BUSINESS_ALREADY_EXIST: 'Business Already Exist',


    //-----------------Access Right Role Mapping-----------------

    SAVE_ACCESS_RIGHT_ROLE_MAPPING_SUCCESSFULLY: 'Access Right Role Mapping Save Successfully',
    FAILED_TO_SAVE_ACCESS_RIGHT_ROLE_MAPPING: 'Failed To Save Access Right Role',

    GET_ALL_ACCESS_RIGHT_ROLE_MAPPING: 'Get All Access Right Role Mapping',
    FAILED_TO_GET_ACCESS_RIGHT_ROLE_MAPPING: 'Failed To Get Access Right Role Mapping',

    UPDATE_ACCESS_RIGHT_ROLE_SUCCESSFULLY: 'Access Right Role Mapping Update Successfully',
    FAILED_TO_UPDATE_RIGHT_ROLE_MAPPING: 'Failed To Update Access Right Role Mapping',

    GET_PRIVILEGE_LIST_SUCCESSFULLY: 'Get Privilege List Successfully',
    FAILED_TO_GET_PRIVILEGE_LIST: 'Failed To Get Privilege List',

    UPDATE_PRIVILEGE_SUCCESSFULLY: 'Update Privilege Successfully',
    FAILED_TO_UPDATE_PRIVILEGE: 'Failed To Update Privilege',

    SAVE_PRIVILEGE_SUCCESSFULLY: 'Save Privilege Successfully',
    FAILED_TO_SAVE_PRIVILEGE: 'Failed To Save Privilege',


    //-------------------Gst Setting-------------------------

    GET_GST_SETTING_SUCCESSFULLY: 'Get Gst Setting Successfully',
    FAILED_TO_GET_GST_SETTING: 'Failed To Get Gst Setting',

    UPDATE_GST_SETTING_SUCCESSFULLY: 'Update Gst Setting Successfully',
    FAILED_TO_UPDATE_GST_SETTING: 'Failed To Update Gst Setting',

    ADD_GST_SUCCESSFULLY: 'Add Gst Successfully',
    FAILED_TO_ADD_GST: 'Failed To Add Gst',
    INVALID_REQUEST_MODEL: 'Invalid request model',
};