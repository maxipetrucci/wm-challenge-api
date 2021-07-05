const Sequelize = require("sequelize");
const SERVER_CONFIG = require("../config/server");

const sequelize = new Sequelize(SERVER_CONFIG.DATABASE_NAME, SERVER_CONFIG.DATABASE_USERNAME, SERVER_CONFIG.DATABASE_PASSWORD, {
    host: SERVER_CONFIG.DATABASE_HOST,
    port: SERVER_CONFIG.DATABASE_PORT,
    dialect: 'mysql'
});

class DatabaseService {
    static init = async () => {
        return sequelize.authenticate();
    }

    static get = () => {
        return sequelize;
    }
}

module.exports = DatabaseService;