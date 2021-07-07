const Sequelize = require("sequelize");
const SERVER_CONFIG = require("../config/server.config");

const sequelize = new Sequelize(SERVER_CONFIG.DATABASE_NAME, SERVER_CONFIG.DATABASE_USERNAME, SERVER_CONFIG.DATABASE_PASSWORD, {
    host: SERVER_CONFIG.DATABASE_HOST,
    port: SERVER_CONFIG.DATABASE_PORT,
    dialect: 'mysql',
    logging: SERVER_CONFIG.ENV == 'dev'
});

class DatabaseService {
    static sync = async () => {
        return sequelize.sync();
    }

    static get = () => {
        return sequelize;
    }
}

module.exports = DatabaseService;