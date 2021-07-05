const Tweet = require("../models/tweet");
const User = require("../models/User");

class TweetsService {
    static findAll = async () => {
        return Tweet.findAll({ include: User });
    }
}

module.exports = TweetsService;