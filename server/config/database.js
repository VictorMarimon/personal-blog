import mongoose from 'mongoose';

import { APP_NAME, DB_NAME, MONGO_URI } from '../utils/constants.utils.js';

async function mongoConnect() {
    if (!MONGO_URI) {
        throw new Error(
            "MONGODB_URI environment variable is not defined. Please check your .env file and ensure it contains a valid MongoDB connection string."
        );
    }

    try {
        await mongoose.connect(MONGO_URI, {
            appName: APP_NAME,
            dbName: DB_NAME,
            compressors: 'zlib',
        });
    } catch (error) {
        throw new Error(`[FAILED_TO_CONNECT_TO_MONGODB]: ${error.message}`);
    }
}

export default mongoConnect;
