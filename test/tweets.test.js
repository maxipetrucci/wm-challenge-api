const request = require("supertest");
const app = require('../app');
const { MIN_LATESTS_LIMIT, MAX_LATESTS_LIMIT } = require("../routers/tweets.router");

describe("/tweets", () => {
    it("/latests should limit the tweets based on limit parameter", done => {
        let limit = 20;
        request(app)
        .get(`/tweets/latests?limit=${limit}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(response => {
            if (response.body.length != limit) {
                return `Tweets size (${response.body.length}) doesn't match with ${limit}`;
            }
            
        }, done);
    });

    it(`/latests should throw error on limit lower than ${MIN_LATESTS_LIMIT}`, done => {
        let lowerLimit = MIN_LATESTS_LIMIT - 1;
        request(app)
        .get(`/tweets/latests?limit=${lowerLimit}`)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it(`/latests should throw error on limit higher than ${MAX_LATESTS_LIMIT}`, done => {
        let higherLimit = MAX_LATESTS_LIMIT + 1;
        request(app)
        .get(`/tweets/latests?limit=${higherLimit}`)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it("/latests should return older tweets than untilid", done => {
        let mostRecentTweetId = BigInt(1414384927076925440);
        request(app)
        .get(`/tweets/latests?untilid=${mostRecentTweetId}`)
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(response => {
            let errorTweetsId = response.body.filter(tweet => tweet.id > mostRecentTweetId).map(tweet => tweet.id);
            if (errorTweetsId.length > 0) {
                return `Tweets (${errorTweetsId}) are more recent than ${mostRecentTweetId}`;
            }
            
        }, done);
    });

    it(`/latests should throw error on invalid untilid`, done => {
        let invalidUntilId = "invalid_tweet_id";
        request(app)
        .get(`/tweets/latests?untilid=${invalidUntilId}`)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
});