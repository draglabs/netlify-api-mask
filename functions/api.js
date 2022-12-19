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
        
        config.url = process.env.DESTINATION_API_ENDPOINT + endpoint;
        console.log({"getEndpoint":config.url})
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

router.get('/api/', get('/api/'))

router.get('/api/campaigns/metrics', get('/api/campaigns/metrics'))

router.get('/api/channels', get('/api/channels'))

router.get('/api/messageTypes', get('/api/messageTypes'))

router.get('/api/users/:email', getWithParam(params => `/api/users/${params.email}`))

router.post('/api/users/update', post(`/api/users/update`))

router.post('/api/users/updateSubscriptions', post(`/api/users/updateSubscriptions`))

function iterableRequest(config, res) {
    axios(config)
        .then(function (response) {
            res.status(response.status).send(response.data)
          //  console.log("okIterableRequest", config)
        })
        .catch(function (error) {
            res.status(500).send({ error: error })
          //  console.log("node verion",process.version)
            console.log("errorIterableRequest", config.url)
            
        });
}

app.use('/', router);

module.exports.handler = serverless(app);

// module.exports.handler = (event, context) => {
//     console.log(event.path)
//     return {A:"a"}
// }