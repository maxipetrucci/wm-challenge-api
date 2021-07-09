const express = require('express');
const { check, validationResult } = require('express-validator');
const TweetsService = require('../services/tweets.service');
const { searchLastSevenDaysJavascriptTweets } = require('../services/twitter.service');
const UsersService = require('../services/users.service');
const tweetsRouter = express.Router();

const MIN_LATESTS_LIMIT = 10;
const MAX_LATESTS_LIMIT = 100;

tweetsRouter.get('/latests', 
    [
        check('fromid')
            .optional()
            .isNumeric()
            .withMessage('Invalid fromid'),
        check('limit')
            .optional()
            .isNumeric()
            .custom((value) => value >= MIN_LATESTS_LIMIT && value <= MAX_LATESTS_LIMIT)
            .withMessage(`Param limit must be between ${MIN_LATESTS_LIMIT} and ${MAX_LATESTS_LIMIT}`)
        ],
    (request, response) => {
        var errors = validationResult(request).array();
        if (errors.length > 0) {
            return response.status(400).send({ errors: errors.map(e => ({ param: e.param, msg: e.msg }))});
        }

        const fromId = request.query.fromid;
        const limit = request.query.limit;
        
        if (fromId == undefined) {
            fetchAndStoreTweets({fromId, limit})
            .then(tweets => response.status(200).send(tweets))
            .catch(e => {
                console.log(e);
                response.status(500).send({ errors: [{ msg: 'Internal error' }] });
            });
        }
        else {
            TweetsService.findAllSinceId({ sinceId: fromId, limit: limit })
            .then(tweets => {
                if (tweets.length == limit) {
                    response.status(200).send(tweets);
                }
                else {
                    fetchAndStoreTweets({fromId, limit})
                    .then(fetchedTweets => response.status(200).send(fetchedTweets))
                }
            })
            .catch(e => {
                console.log(e);
                response.status(500).send({ errors: [{ msg: 'Internal error' }] });
            });
        }
    }
);

const fetchAndStoreTweets = async ({ fromId, limit }) => {
    return searchLastSevenDaysJavascriptTweets({ fromId, limit })
    .then(async apiResponse => {
        return storeTweets(apiResponse)
        .then(tweetsStored => {
            return apiResponse.data.map(t => ({
                id: t.id,
                text: t.text,
                author_id: t.author_id,
                created_at: t.created_at,
                retweets_count: t.public_metrics.retweet_count,
                replies_count: t.public_metrics.reply_count,
                likes_count: t.public_metrics.like_count,
                quotes_count: t.public_metrics.quote_count,
                user: {
                    id: t.author_id,
                    username: apiResponse.includes.users.filter(u => u.id == t.author_id)[0].username,
                    name: apiResponse.includes.users.filter(u => u.id == t.author_id)[0].name,
                    image_url: apiResponse.includes.users.filter(u => u.id == t.author_id)[0].profile_image_url,
                    verified: apiResponse.includes.users.filter(u => u.id == t.author_id)[0].verified
                }
            }));
        })
    });
}

const storeTweets = (tweets) => {
    let promises = tweets.includes.users.map(u => UsersService.upsert({
        id: u.id,
        username: u.username,
        name: u.name,
        verified: u.verified,
        image_url: u.profile_image_url
    }));

    promises = promises.concat(tweets.data.map(t => TweetsService.upsert({
        id: t.id,
        author_id: t.author_id,
        text: t.text,
        created_at: t.created_at.substr(0, 19).replace('T', ' '),
        retweets_count: t.public_metrics.retweet_count,
        replies_count: t.public_metrics.reply_count,
        likes_count: t.public_metrics.like_count,
        quotes_count: t.public_metrics.quote_count
    })));

    return Promise.all(promises);
}

module.exports = tweetsRouter;