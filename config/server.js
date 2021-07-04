require('dotenv').config();

const SERVER_CONFIG = {
    PORT: process.env.SERVER_PORT || 3002
}

module.exports = SERVER_CONFIG;