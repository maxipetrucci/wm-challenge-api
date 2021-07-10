const Twitter = require("twitter-v2");

const twitterClient = new Twitter({
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

const searchLastSevenDaysJavascriptTweets = async ({ untilId, limit }) => {
    const DEFAULT_LIMIT = 25;
    const DAYS_TO_SUBSTRACT = 7;
    
    let searchParams = {
        query: "javascript",
        max_results: limit || DEFAULT_LIMIT,
        "tweet.fields": "attachments,author_id,created_at,public_metrics,in_reply_to_user_id",
        "user.fields": "name,profile_image_url,username,verified",
        expansions: "author_id"
    };
    
    if (untilId) {
        searchParams.until_id = untilId;
    }
    else {
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - DAYS_TO_SUBSTRACT);
        searchParams.start_time = startDate.toISOString();
    }

    return twitterClient.get('tweets/search/recent', searchParams);
}

module.exports = {
    searchLastSevenDaysJavascriptTweets
}