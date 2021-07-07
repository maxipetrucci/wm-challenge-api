const Sequelize = require("sequelize");
const DatabaseService = require("../services/database.service");

const User = DatabaseService.get().define('users', {
    id: { type: Sequelize.BIGINT.UNSIGNED, primaryKey: true },
    username: { type: Sequelize.STRING, unique: true },
    name: Sequelize.STRING,
    image_url: Sequelize.STRING,
    verified: Sequelize.BOOLEAN
}, { timestamps: false });

module.exports = User;