const { Op } = require("sequelize");
const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

class TweetsService {
    static findAllUntilId = async ({ untilId = undefined, limit = 25 }) => {
        let whereCondition = undefined;
        if (untilId) {
            whereCondition = {
                id: {
                    [Op.lt]: untilId
                }
            }
        }

        return Tweet.findAll({
            where: whereCondition,
            include: User,
            order: [
                ['id', 'DESC']
            ],
            limit: parseInt(limit)
        })
        .then(tweets => JSON.parse(JSON.stringify(tweets, null, 2)))
    }

    static upsert = (tweet) => {
        return Tweet.upsert(tweet);
    }
}

module.exports = TweetsService;