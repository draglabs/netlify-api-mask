const express = require("express");
const serverless = require('serverless-http');
const axios = require('axios');
const app = express();
const router = express.Router();

require('./middleware')(app);

var config = {
    method: 'get',
    headers: {
        'Api-Key': process.env.DESTINATION_API_KEY
    }
};

router.get('/', (req, res) => {
    config.url = process.env.DESTINATION_API_ENDPOINT + '/campaigns/metrics';
    iterableRequest(config,res);
})

router.get('/campaigns/metrics', (req, res) => {
    config.url = process.env.DESTINATION_API_ENDPOINT + '/campaigns/metrics';
    iterableRequest(config,res);
})

router.get('/channels' , (req , res) => {
    config.url = process.env.DESTINATION_API_ENDPOINT + '/channels';
    iterableRequest(config,res);
})

router.get('/messageTypes', (req , res) => {
    config.url = process.env.DESTINATION_API_ENDPOINT + '/messageTypes';
    iterableRequest(config,res);
})

router.get('/users/:email', (req , res) => {
    config.url = process.env.DESTINATION_API_ENDPOINT + `/users/${req.params.email}`;
    iterableRequest(config,res);
})

router.post('/users/update', (req , res) => {
    config.url = process.env.DESTINATION_API_ENDPOINT + `/users/update`;
    config.method = 'post';
    config.data = req.body;
    iterableRequest(config,res);
})

router.post('/users/updateSubscriptions', (req , res) => {
    config.url = process.env.DESTINATION_API_ENDPOINT + `/users/updateSubscriptions`;
    config.method = 'post';
    config.data = req.body;
    iterableRequest(config,res);
})

function iterableRequest(config,res) {
    axios(config)
        .then(function (response) {
            res.status(response.status).send(response.data)
        })
        .catch(function (error) {
            res.status(500).send({ error: error })
        });
}

app.use('/api/', router);

module.exports.handler = serverless(app);