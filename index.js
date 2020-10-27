const express = require('express');
const app = express();

const axios = require('axios');

const {WebhookClient} = require('dialogflow-fulfillment');

const api='http://127.0.0.1:8000/';

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('run server nodjs');
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
  function despedida(agent) {
  
  }
 
  function consulta(agent){
    // let data = JSON.stringify(req.body.originalDetectIntentRequest["payload"]["body"]["contacts"][0]["wa_id"]);
      let data = JSON.stringify(req.body.originalDetectIntentRequest["payload"]["contact"]["cId"]);
      const language = agent.parameters.language;
      const nombre = agent.parameters.nombre;
  
      const dni = agent.parameters.dni;
      const comprobante = agent.parameters.comprobante;
    
     
        axios.post(api+'api/clients', {
          nombre,dni,comprobante,data
        }).then((rs) => {
          console.log(rs.data)
        }).catch((error) => {
          console.error(error);
        }).finally(() => {
          // TODO
        });
        
    
      agent.add(`*Mensaje final*, recuerda que debes de adjuntar la imagen de tu comprobante de pago para poder completar el registro. Te estaremos contactando para darte los resultados de los ganadores.  

      ¡Mucha suerte!`);

  }


  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('si',consulta);
  agent.handleRequest(intentMap);
  });

app.listen(process.env.PORT || 3000,(e)=>{
    console.log("run port 3000");
})