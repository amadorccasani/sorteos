const {WebhookClient} = require('dialogflow-fulfillment');
// const api='http://127.0.0.1:8000/';
const api = 'http://3.128.192.110/';
const axios = require('axios');

module.exports = {
    WebhookClient: WebhookClient,
    api:api,
    axios:axios
   
};