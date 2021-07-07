const express = require('express');
const SERVER_CONFIG = require('./config/server.config');
const tweetsRouter = require('./routers/tweets.router');
const DatabaseService = require('./services/database.service');

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
    
    DatabaseService.sync().then(() => console.log('Model successfully synchronized'))

    console.log(`Server listening on port ${server.address().port}`);
});