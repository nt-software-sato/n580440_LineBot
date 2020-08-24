'use strict';
require('dotenv').config();
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
var helmet = require('helmet');
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());


var privateKey = fs.readFileSync('./SSL/private.key');
var certificate = fs.readFileSync('./SSL/certificate.crt')
var cafile = fs.readFileSync('./SSL/ca_bundle.crt');
//LineBotPushService
const LineBotPush = require('./Service/LineBotPush.js');
//LineBotPush.PushAction();
schedule.scheduleJob('*/1 * * * *', function () {
  LineBotPush.PushAction();
});



app.get('/App', function (req, res) {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <script>
  
          location.href="https://lin.ee/DJu8Zsb"
  
      </script>
  </body>
  </html>`, 200);
});

//static
app.use(express.static('Views'));

//lintBot
const LineBot = require('./MiddleWare/LineBot');
app.use('/LineBot', LineBot);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const LineConnectAuth = require('./MiddleWare/LineConnectAuth');
app.use('/LineConnectAuth', LineConnectAuth);



app.get('*', function (req, res) {
  res.send('400 Bad Request', 400);
});
app.post('*', function (req, res) {
  res.send('400 Bad Request', 400);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`listening on ${port}`);
});
var credentials = { ca: cafile, key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app)
httpsServer.listen(3443);