import * as express from 'express';
import {MessageConstant} from '../core/messageConstant'

// Route level error handler
export default (app: express.Application ) =>{
    //catch 404 and forward to error handler
    app.use((req, res, next) => {
        let err:any = new Error('Not Found');
        err.status = MessageConstant.FAILED_ERROR_CODE
        next(err);
    });

    app.use(function (err:any, req:express.Request, res:express.Response, next:express.NextFunction) {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })
}