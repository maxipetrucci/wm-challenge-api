const express = require('express');
const tweetsRouter = express.Router();

tweetsRouter.get(`/lastest`, (request, response) => {
    response.send([]);
});

module.exports = tweetsRouter;