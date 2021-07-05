const express = require('express');
const { searchLastSevenDaysJavascriptTweets } = require('../services/twitter-service');
const tweetsRouter = express.Router();

tweetsRouter.get('/latest', (request, response) => {
    const fromId = request.query.fromid;
    const maxResults = request.query.maxresults;
    //Si fromid es null => buscar en twitter, guardar en la DB y mostrar los N mas recientes
    //Si fromid es distinto de null => buscar en la DB si hay N, si hay N devolver y si no buscar en twitter desde el ultimo
    var finalResponse = [];
    var searchParams = {};

    if (fromId) {
        searchParams.fromId = fromId;
    }

    if (maxResults) {
        searchParams.maxResults = maxResults;
    }

    searchLastSevenDaysJavascriptTweets(searchParams)
    .then(response => finalResponse = response)
    .catch(e => console.log(e))
    .finally(() => response.send(finalResponse));
});

module.exports = tweetsRouter;