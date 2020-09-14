'use strict';

//require('dotenv').config();
const path = require('path');
global.g_svrRoot = path.resolve(__dirname);
global.g_config = require(`${g_svrRoot}/config.json`);



const schedule = require('node-schedule');
const LineBotPush = require(`${g_svrRoot}/Service/LineBotPush.js`);

schedule.scheduleJob('*/10 * * * * *', () => LineBotPush.PushAction());

console.log(`***Push Service Startup***`);