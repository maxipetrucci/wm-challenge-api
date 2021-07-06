const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

class TweetsService {
    static findAll = async () => {
        return Tweet.findAll({ include: User });
    }

    static upsert = (tweet) => {
        return Tweet.upsert(tweet);
    }
}

module.exports = TweetsService;