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

function get(endpoint) {
    return (req, res) => {
        console.log(endpoint)
        config.url = process.env.DESTINATION_API_ENDPOINT + endpoint;
        iterableRequest(config, res);
    }
}

function getWithParam(endpointBuilder) {
    return (req, res) => {
        config.url = process.env.DESTINATION_API_ENDPOINT + endpointBuilder(req.params);
        iterableRequest(config, res);
    }
}

function post(endpoint) {
    return (req, res) => {
        console.log(endpoint)
        config.url = process.env.DESTINATION_API_ENDPOINT + endpoint;
        config.method = 'post';
        config.data = req.body;
        iterableRequest(config, res);
    }
}

router.get('/', get('/'))

router.get('/campaigns/metrics', get('/campaigns/metrics'))

router.get('/channels', get('/channels'))

router.get('/messageTypes', get('/messageTypes'))

router.get('/users/:email', getWithParam(params => `/users/${params.email}`))

router.post('/users/update', post(`/users/update`))

router.post('/users/updateSubscriptions', post(`/users/updateSubscriptions`))

function iterableRequest(config, res) {
    axios(config)
        .then(function (response) {
            res.status(response.status).send(response.data)
            console.log("ok", config)
        })
        .catch(function (error) {
            res.status(500).send({ error: error })
            console.log("error", config.url, error)
        });
}

app.use('', router);

//module.exports.handler = serverless(app);

module.exports.handler = (event, context) => {
    console.log(event.path)
    return {A:"a"}
}