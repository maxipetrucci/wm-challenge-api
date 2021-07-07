const Sequelize = require("sequelize");
const DatabaseService = require("../services/database.service");

const User = DatabaseService.get().define('users', {
    id: { type: Sequelize.BIGINT.UNSIGNED, primaryKey: true },
    username: { type: Sequelize.STRING(15), unique: true },
    name: Sequelize.STRING(50),
    image_url: Sequelize.STRING(100),
    verified: Sequelize.BOOLEAN
}, {
    collate: 'utf8mb4_unicode_ci',
    timestamps: false
});

module.exports = User;