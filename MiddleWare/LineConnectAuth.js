'use strict';
require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");
const nonce = require('nonce')();
const { Sequelize } = require('sequelize');



const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
  hostURL: process.env.hostURL
};
const lineRequest = axios.create({
  baseURL: 'https://api.line.me/v2/bot',
  headers: { 'Authorization': `Bearer ${config.channelAccessToken}` }
});
const client = new line.Client(config);
///////////////////////////////////////////////////////

const n580440__CallCenter = new Sequelize('n580440__CallCenter', 'sa', '2410', {
  host: 'localhost',
  dialect: 'mssql',
  port: 1433,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
const n580440_Line = new Sequelize('n580440_Line', 'sa', '2410', {
  host: 'localhost',
  dialect: 'mssql',
  port: 1433,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
const Users = n580440__CallCenter.define('Users', {
  UserId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  Password: {
    type: Sequelize.STRING, 
  },
  Status: {
    type: Sequelize.STRING, 
  }
}, { timestamps: false });
const UsersLineInfo = n580440_Line.define('UsersLineInfo', {
  UserId: {
    type: Sequelize.STRING, 
    primaryKey: true, 
  },
  token: {
    type: Sequelize.STRING, 
  },
  nonce: {
    type: Sequelize.STRING,
  }
}, { timestamps: false });
////////////////////////////////////
router.post('/', function (req, res) {
  //console.log(req.body.account);
  Users.count({
    where: { UserId: req.body.account, Password: md5(req.body.password) },
  }).then((count) => {
    if (count == '0') {
      res.json({ status: "400", Msg: "Auth Fail" });
    } else {
      let tempNonce = nonce();
      UsersLineInfo.create({ UserId: req.body.account, token: req.body.token, nonce: tempNonce });
      res.json({ status: "200", Msg: "Auth Success", nonce: tempNonce });
    }
  });
  return;
})
module.exports = router;