const app = require('./app');
const SERVER_CONFIG = require('./config/server.config');
const DatabaseService = require('./services/database.service');

const server = app.listen(SERVER_CONFIG.PORT, error => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    
    DatabaseService.sync().then(() => console.log('Model successfully synchronized'));

    console.log(`Server listening on port ${server.address().port}`);
});