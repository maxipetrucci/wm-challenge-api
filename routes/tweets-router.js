const express = require('express');
const tweetsRouter = express.Router();

tweetsRouter.get('/latest/:fromid*?', (request, response) => {
    //Si fromid es null => buscar en twitter, guardar en la DB y mostrar los N mas recientes
    //Si fromid es distinto de null => buscar en la DB si hay N, si hay N devolver y si no buscar en twitter desde el ultimo
    const fromId = request.params.fromid;
    response.send([]);
});

module.exports = tweetsRouter;