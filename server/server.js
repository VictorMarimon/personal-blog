import 'dotenv/config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';

import configCompression from './config/middlewares/compression.js';
import mongoConnect from './config/database.js';
import router from './routes/routes.js';
import { errorHandler, routeNotFound } from './config/middlewares/errorHandler.js';
import { PORT } from './utils/constants.utils.js';

const app = express();

function configApp() {
    app.use(compression(configCompression));
    app.use(cookieParser());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(errorHandler);
}

function routesApp() {
    app.use('/api', router);
    app.use(routeNotFound);
}

async function main() {
    configApp();
    routesApp();

    await mongoConnect();

    app.listen(PORT);
}

(async () => {
    await main();
})();
