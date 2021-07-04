const express = require('express');
const { SERVER_PORT } = require('./config/server');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

const server = app.listen(SERVER_PORT, (error) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
 
    console.log(`Server listening on port ${server.address().port}`);
});