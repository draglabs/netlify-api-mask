const express = require("express");
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/' , (req , res)=>{

    res.json({
        'path': 'homepage'
    });

})

router.get('/user' , (req , res)=>{

    res.json({
        'firstName': 'Manish',
        'lastName': 'Kumar'
    });

})

app.use('/', router);

module.exports.handler = serverless(app);