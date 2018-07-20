/**
 *Created By: Md. Nazmus Salahin
 *Created Date: 10/28/2017
 *Modified By:
 *Modified date:
 *(C) CopyRight Nybsys ltd.
 */
export default class LoggerModule {


    constructor() {

    }

    static staticTest(){
        console.info('Im from static');
    }
    public intanceMa(){
        console.info('I am from instance');
    }
}