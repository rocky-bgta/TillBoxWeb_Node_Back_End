/**
 * Simple model class
 */
export default class SimpleModel {


    constructor() {

    }

    static staticTest(){
        console.info('Im from static');
    }
    public intanceMa(){
        console.info('I am from instance');
    }
}