'use strict';
require('dotenv').config();

const path = require('path');
global.g_svrRoot = path.resolve(__dirname);

const fs = require('fs');
// const http = require('http');
const https = require('https');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const helmet = require('helmet');

const LineBotPush = require(`${g_svrRoot}/Service/LineBotPush.js`);
const VenderBot = require(`${g_svrRoot}/LineWebhook/VenderBot`);
const ClientBot = require(`${g_svrRoot}/LineWebhook/ClientBot`);
const VenderHomeRouter = require(`${g_svrRoot}/Router/VenderHomeRouter.js`);
const SecurityFilter = require(`${g_svrRoot}/Router/SecurityFilter.js`);
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://static.line-scdn.net"]
    }, 'reportOnly': true
}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());
//LineBotPushService//////////////////////////////////
//LineBotPush.PushAction();
schedule.scheduleJob('*/1 * * * *', function () {
    LineBotPush.PushAction();
});

app.use('/static', express.static(`Static`));

//lineBot/////////////////////////////////////////////
app.use('/VenderBot', VenderBot);
app.use('/ClientBot', ClientBot);

//init formData///////////////////////////////////////
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//router/////////////////////////////////////////
app.use('/Vender', VenderHomeRouter);
app.use('*', SecurityFilter);

//init Dev Server///////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

//init HTTPS///////////////////////////////////////////
const privateKey = fs.readFileSync(`${g_svrRoot}/SSL/private.key`);
const certificate = fs.readFileSync(`${g_svrRoot}/SSL/certificate.crt`)
const cafile = fs.readFileSync(`${g_svrRoot}/SSL/ca_bundle.crt`);
const credentials = {ca: cafile, key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app)
httpsServer.listen(3443);