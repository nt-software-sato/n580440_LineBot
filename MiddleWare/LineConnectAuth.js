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
let Model = require('../Model/LineBotModel')

const config = process.env;

const lineRequest = axios.create({
  baseURL: 'https://api.line.me/v2/bot',
  headers: { 'Authorization': `Bearer ${config.channelAccessToken}` }
});
const client = new line.Client(config);
///////////////////////////////////////////////////////

router.post('/', function (req, res) {
  Model.Users.count({
    where: { UserId: req.body.account, Password: md5(req.body.password) },
  }).then((count) => {
    if (count == '0') {
      res.json({ status: "400", Msg: "Auth Fail" });
    } else {
      let tempNonce = nonce();
      Model.UsersLineInfo.create({ UserId: req.body.account, token: req.body.token, nonce: tempNonce });
      res.json({ status: "200", Msg: "Auth Success", nonce: tempNonce });
    }
  });
  return;
})
module.exports = router;