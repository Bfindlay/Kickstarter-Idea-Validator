'use strict'
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');


Router.use(bodyParser.json()); // support json encoded bodies
Router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



//API Verification MiddleWare
Router.use(function(req, res, next) {
    const { body, method, url } = req;
    return next();
}); 


//API END POINTS

Router.post('/idea', (req,res) => { 
    const { idea } = req.body.idea;
    global.nb.predictClass(idea)
        .then( result => {
            console.log('PREDICTED RESULT', result);
            res.send(result).status(200);
        }).catch(err => {
            res.send(err).status(500);
        });
});


module.exports = Router;

