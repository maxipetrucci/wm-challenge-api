const Sequelize = require("sequelize");
const DatabaseService = require("../services/database.service");
const User = require("./User");

const Tweet = DatabaseService.get().define('tweets', {
    id: { type: Sequelize.BIGINT, primaryKey: true },
    author_id: Sequelize.STRING,
    text: Sequelize.STRING,
    created_at: Sequelize.DATE,
    retweets_count: Sequelize.INTEGER,
    replies_count: Sequelize.INTEGER,
    likes_count: Sequelize.INTEGER,
    quotes_count: Sequelize.INTEGER
}, { timestamps: false });

Tweet.belongsTo(User, { foreignKey: 'author_id', targetKey: 'id' });

module.exports = Tweet;