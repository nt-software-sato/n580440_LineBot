'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const schedule = require('node-schedule');


//LineBotPushService
const LineBotPush = require('./Service/LineBotPush.js');
LineBotPush.PushAction();
schedule.scheduleJob('*/1 * * * *', function () {
  LineBotPush.PushAction();
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
