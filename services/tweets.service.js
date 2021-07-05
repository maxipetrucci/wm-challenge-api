const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");

class TweetsService {
    static findAll = async () => {
        return Tweet.findAll({ include: User });
    }
}

module.exports = TweetsService;