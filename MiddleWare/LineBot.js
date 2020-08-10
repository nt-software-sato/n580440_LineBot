'use strict';
require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const router = express.Router();
const axios = require("axios");
const { Sequelize } = require('sequelize');
let Model = require('../Model/LineBotModel')

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

/////////
router.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(HandleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
/////////
let GetLinktoken = async (uid) => {
  return lineRequest.post(`user/${uid}/linkToken`, {
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      let lineLinkToken = data.linkToken;
      return lineLinkToken;
    })
}

// event handler
let HandleEvent = async (event) => {
  let replyMsg = {};
  if ((event.type !== 'message' || event.message.type !== 'text') && event.type !== 'accountLink') {
    console.log(event);
    return Promise.resolve(null);
  } else if (event.type == 'accountLink') {
    // if(event.link.result=='ok'){
    let lineUserId = event.source.userId;
    let linkNonce = event.link.nonce;

    Model.UsersLineInfo.update({ lineUserId: lineUserId }, {
      where: {
        nonce: linkNonce
      }
    })

    console.log(event);

    replyMsg = { type: 'text', text: `588440帳號綁定成功` };
    return client.replyMessage(event.replyToken, replyMsg);
    // }
  } else if (event.type == 'message') {
    console.log(event);
    const msgText = event.message.text;
    const userId = event.source.userId;
    let replyMsg = {};
    switch (msgText) {
      case '帳號綁定':
        let result = await GetLinktoken(userId);
        replyMsg = {
          "type": "template",
          "altText": "580440帳號綁定",
          "template": {
            "thumbnailImageUrl": `https://www.580440.com/img/logo.png`,
            "type": "buttons",
            "text": "580440帳號綁定",
            "defaultAction": {
              "type": "uri",
              "label": "View detail",
              "uri": `${config.hostURL}/LineLogin.html?token=${result}`
            },
            "actions": [{
              "type": "uri",
              "label": "開始綁定",
              "uri": `${config.hostURL}/LineLogin.html?token=${result}`
            }]
          }
        };
        console.log(replyMsg);
        break;//帳號綁定
      default:
        replyMsg = { type: 'text', text: `機器人不知道"${event.message.text}" 這是甚麼意思?` };
        break;//default
    }//switch
    return client.replyMessage(event.replyToken, replyMsg);
  }
}
module.exports = router;