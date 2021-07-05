const express = require('express');
const SERVER_CONFIG = require('./config/server');
const tweetsRouter = require('./routers/tweets.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.use('/tweets', tweetsRouter);

const server = app.listen(SERVER_CONFIG.PORT, error => {
    if (error) {
        return console.log(`Error: ${error}`);
    }

    console.log(`Server listening on port ${server.address().port}`);
});