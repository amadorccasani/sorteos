const express = require('express');
const app = express();

const {WebhookClient,api,axios} = require('./config');

const { stringify } = require('actions-on-google/dist/common');


// const api = 'http://3.128.192.110/';
let nombred = [];
let msjregistro=[];


const route = require('./controllers/plazaveaController');
app.use(route);

app.get('/', function(req, res) {
  res.send('run server nodjs');
});



app.post('/vivanda',express.json(), function(req, res) {
  const agent = new WebhookClient({ request:req, response:res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

function welcome(agent) {
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = now.getDate();
let hour = now.getHours();
let min = now.getMinutes();
let sec = now.getSeconds();



var f1 = new Date(year, month, day,hour,min,sec); 
var f2 = new Date(year, month, day,20,00,00); 
let valor = 0;
// if (f1.getTime() <= f2.getTime()){
  let contact_id = JSON.stringify(req.body.originalDetectIntentRequest["payload"]["contact"]["cId"]);

  agent.add(`
¡Hola! 🤗 Soy el asistente virtual de Pernod Ricard 🥂 🍷 🥃


GMRC S.A., como proveedor encargado de la dinámica y entrega de premios, se obliga a guardar reserva y confidencialidad de la información, entendiéndose por ambos conceptos la no divulgación, revelación o publicación de la información otorgada de manera directa o indirecta, debiendo desarrollar las acciones que sean necesarias para evitar que se generen riesgos que impliquen que la información sea, o pueda ser conocida por otras personas que no sea el personal que interviene directamente en la ejecución de la campaña. Se entiende que dicho personal es únicamente el que requiere conocer la información. 
  
Asimismo y por extensión, Pernod Ricard, al ser la empresa organizadora, se compromete y se obliga a tomar todas las medidas y precauciones razonables para evitar la divulgación de la información a la que se tenga acceso.`);
  agent.add(`
¿Deseas continuar?
  
    *1.* Sí
    *2.* No
        
👆 Escribe el número para seleccionar una opción.`);

// }else{
// agent.add(`
// El registro del sorteo se acaba de finalizar puedes
// registrarte mañana

// Horarios : 8am hasta 8pm 

// Gracias por su comprension :D`);
// }

  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
 
 

  function respuesSi(){
    agent.add(`¡Estupendo! 😎 

    Estos son algunos de los premios que puedes ganar:
    
    - Premio 1
    - Premio 2
    - Premio 3
    - Premio 4`);
    agent.add(`Por favor, ingresa tus nombres y apellidos: _(recuerda responder todas las consultas en una sola oración)_`);
  }

  function tomaDatos(agent){
     let contact_id = JSON.stringify(req.body.originalDetectIntentRequest["payload"]["body"]["contacts"][0]["wa_id"]);
      const language = agent.parameters.language;
     
      const name = agent.parameters.name;
      const document_number = agent.parameters.dni;
      const email = agent.parameters.email;
      const phone = agent.parameters.phone;
      const voucher_number = agent.parameters.comprobante;
      const tienda = 'vivanda';
    
    
     
        axios.post(api+'api/clients', {
          name,document_number,email,phone,voucher_number,contact_id,tienda
        }).then((rs) => {
          nombred.unshift(name);
          msjregistro.push(rs.data);
          msjregistro.push(voucher_number)
        }).catch((error) => {
          console.error(error);
        }).finally(() => {
          // TODO
        });

      agent.add(`
  Finalmente debes subir una captura (foto) del comprobante de pago (boleta o factura). *Luego de haber subido la imagen debes escribir la palabra “Finalizar”*. 🤓 Si seguiste mis indicaciones habrás completado tu registro al sorteo`);

  }

  function despedida(agent) {

    let nombre = nombred[0];
    let nameshow = nombre.split(" ",1);

    console.log(msjregistro)
    if(nombred.length > 0){
      if(msjregistro[0] == 1){
    agent.add(`
He finalizado tu registro. Muchas gracias por participar `+nameshow[0]+`
    
Recuerda que estaremos enviando un mensaje a partir de las 21:00 pm para informarte si eres el ganador del día 😉.`);

    agent.add(`No te olvides que tienes hasta tres (03) opciones de registro al día con vouchers de compra diferentes. ¡Mucha suerte! 🤞 🤖 `);

      }
      if(msjregistro[0] == 0){
        agent.add(`El `+msjregistro[1]+` comprobante de pago ya ha sido registrado, por favor, ingrese un comprobante de pago válido`);
      }

      if(msjregistro[0] == 2){
        agent.add(`
        Te recordamos que sólo puedes registrarte hasta en tres oportunidades por día (con comprobantes de pago distintos). Muchas gracias por tu comprensión. Para mayor información sobre los términos y condiciones del sorteo te invitamos a visitar el siguiente enlace: www.info.com`);
      }
  
      nombred=[];
      msjregistro=[];  
  }else{
    agent.add(`Digitar la palabra hola `);
  }

  }
  

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('si',respuesSi);
  intentMap.set('tomaDatos',tomaDatos);
  intentMap.set('despedida', despedida);
  
  agent.handleRequest(intentMap);
  });

app.listen(process.env.PORT || 3000,(e)=>{
    console.log("run port 3000");
})

// heroku config:add TZ="America/Chicago"