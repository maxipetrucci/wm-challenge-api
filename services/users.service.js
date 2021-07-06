const User = require("../models/user.model");

class UsersService {
    static upsert = (user) => {
        return User.upsert(user);
    }
}

module.exports = UsersService;