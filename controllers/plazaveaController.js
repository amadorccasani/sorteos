
const express = require('express');
const route = express.Router();

const {WebhookClient} = require('../config');
// rutas
route.post('/plazavea',express.json(), (req, res) => {
    const agent = new WebhookClient({ request:req, response:res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
    

  function welcome(){
    agent.add(`desde nodjes`);
  }
  function fallback(){
    agent.add(`desde nodjes`);
  }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    // intentMap.set('si',respuesSi);
    // intentMap.set('tomaDatos',tomaDatos);
    // intentMap.set('despedida', despedida);
    
    agent.handleRequest(intentMap);
});


// exportamos 
module.exports = route;