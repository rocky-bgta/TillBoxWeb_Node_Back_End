'use strict';

import {ApiServer} from './app';
import {sequelize} from './db';

export const start = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const apiServer = new ApiServer();
        apiServer.start()
            .then(resolve)
            .catch(reject);

        const graceful = async () => {
            //close database connection
            await sequelize.close();
            console.log('Database connection close successfully');
            apiServer.stop().then(() => process.exit(0));
        };

        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
        process.on('disconnect',graceful);
    });
};
