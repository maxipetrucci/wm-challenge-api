const Sequelize = require("sequelize");
const DatabaseService = require("../services/database-service");

const User = DatabaseService.get().define('users', {
    id: { type: Sequelize.BIGINT.UNSIGNED, primaryKey: true },
    username: Sequelize.STRING,
    name: Sequelize.STRING,
    verified: Sequelize.BOOLEAN
}, { timestamps: false });

module.exports = User;