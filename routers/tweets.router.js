const express = require('express');
const TweetsService = require('../services/tweets.service');
const { searchLastSevenDaysJavascriptTweets } = require('../services/twitter.service');
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
    .then(response => {
        let promises = response.data.map(t => TweetsService.upsert({
            id: t.id,
            author_id: t.author_id,
            text: t.text,
            created_at: t.created_at.substr(0, 19).replace('T', ' '),
            retweets_count: t.public_metrics.retweet_count,
            replies_count: t.public_metrics.reply_count,
            likes_count: t.public_metrics.like_count,
            quotes_count: t.public_metrics.quote_count
        }));

        Promise.all(promises)
        .then(tweetsSaved => console.log(tweetsSaved.filter(t => t[1] == true).length == response.meta.result_count))
        .catch(pe => console.log(pe));
        
        finalResponse = response;
    })
    .catch(e => console.log(e))
    .finally(() => response.send(finalResponse));
});

module.exports = tweetsRouter;