const Twitter = require("twitter-v2");

const twitterClient = new Twitter({
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
});

const searchLastSevenDaysJavascriptTweets = async (params = {}) => {
    const DEFAULT_MAX_RESULTS = 25;
    const DAYS_TO_SUBSTRACT = 7;
    
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - DAYS_TO_SUBSTRACT);
    
    var searchParams = {
        query: "javascript",
        max_results: params.maxResults || DEFAULT_MAX_RESULTS,
        start_time: startDate.toISOString(),
        "tweet.fields": "attachments,author_id,created_at,public_metrics,in_reply_to_user_id",
        "user.fields": "name,profile_image_url,username,verified",
        expansions: "author_id"
    };

    if (params.fromId) {
        searchParams.since_id = params.fromId;
    }
    
    return twitterClient.get('tweets/search/recent', searchParams);
}

module.exports = {
    searchLastSevenDaysJavascriptTweets
}