require('dotenv').config();

const SERVER_CONFIG = {
    PORT: process.env.SERVER_PORT || 3002,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT || 3306,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    LOGGING: process.env.LOGGING == 'true'
}

module.exports = SERVER_CONFIG;