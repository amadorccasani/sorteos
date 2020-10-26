const express = require('express');
const app = express();

const {WebhookClient} = require('dialogflow-fulfillment');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world hugo');
});
app.post('/webhook',express.json(), function(req, res) {
  const agent = new WebhookClient({ request:req, response:res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
 
  
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function intentnode(agent) {
    agent.add(`hola esta es la intencion desde nodejs`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function obtenerimg(agent) {
  
  }
  function consulta(agent){
    agent.add(`desde nodejs consulta`);
  }
  function consulta(agent){
    let data = JSON.stringify(req.body.originalDetectIntentRequest["payload"]["body"]["contacts"][0]["wa_id"]);


 
    agent.add(`numero origen : `+data);
  }
  function mediaHandler(agent){
    agent.add(`img`);
  }




  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('intentnode', intentnode);
  intentMap.set('obtenerimg', obtenerimg);
  intentMap.set('consulta',consulta);
  intentMap.set('Whatsapp Media - fallback',mediaHandler);
  agent.handleRequest(intentMap);
  });

app.listen(3000,(e)=>{
    console.log("run port 3000");
})