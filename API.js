'use strict'
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
const jwt  = require('jsonwebtoken'); 
const axios = require('axios');


Router.use(bodyParser.json()); // support json encoded bodies
Router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



//API Verification MiddleWare
Router.use(function(req, res, next) {
    const { body, method, url } = req;
    if(method === 'POST'){
        let token = body.token;
        if(url === '/auth/login' || url === '/auth/register'){
            return next();
        }
        if (token !== undefined) {
            jwt.verify(token, SECRET_TOKEN, function(err, decoded) {      
                if (err) {
                    console.log('failed to authenticate token');
                    return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    console.log('authenticated token');
                    req.decoded = decoded;
                    return next();
                }
            });
        } else {
            console.log('body does not contain auth code');
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }
    }else{
        // No token needed
        return next();
    }
}); 


//API END POINTS

Router.post('/', (req,res) => { 
   res.send('Guten Tag!').status(200);
});


module.exports = Router;

