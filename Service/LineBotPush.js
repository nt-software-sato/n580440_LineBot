'use strict';
require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const router = express.Router();
const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
let Model = require('../Model/LineBotModel');
const config = process.env;
const lineRequest = axios.create({
  baseURL: 'https://api.line.me/v2/bot',
  headers: { 'Authorization': `Bearer ${config.channelAccessToken}` }
});
const client = new line.Client(config);
// let pushMsg = {
//   "type": "text",
//   "text": "【案件處裡通知】\n\n以下案件請盡快與相關單位聯繫處裡\n\n\n客戶名稱：『客戶名稱』\n單位名稱：『單位名稱』\n報修單號：『報修單號』\n報修品項：『報修品項』\n要求時效：『要求時效』\n\n點擊下列連結查看案件詳情，如有疑問請聯繫580440報修中心，謝謝！\n\n『http://www.example.com』\n"
// }
// let pushMsg = {
//   "type": "text",
//   "text": "【案件處裡通知】\n\n以下案件請盡快與相關單位聯繫處裡\n\n\n客戶名稱：『客戶名稱』\n單位名稱：『單位名稱』\n報修單號：『報修單號』\n報修品項：『報修品項』\n要求時效：『要求時效』\n\n點擊下列連結查看案件詳情，如有疑問請聯繫580440報修中心，謝謝！\n\n『http://www.example.com』\n"
// }

module.exports.PushAction = function (msg) {
  Model.BankOfLineMessages.findAll({
    where: {
      Status: 1
    }
  })
    .then(msgData => {

      msgData.map(msgitem => {
        // Model.UsersLineInfo.findOne({
        //   where: {
        //     UserId: msgitem.ToUserId
        //   }
        // })
        //   .then((infoData) => {
            if (msgitem != null) {
              let json = [msgitem.LineMessage_OpenId, msgitem.LineMessage_Message];
              console.log(json);
              client.pushMessage(msgitem.LineMessage_OpenId, JSON.parse(msgitem.LineMessage_Message));
              Model.BankOfLineMessages.update({ Status: 5 }, {
                where: {
                    Id: msgitem.Id
                }
              })//LineBotPushMsgBank.update
            // } else {
            //   Model.PushMsgBank.update({ Result: '99', ErrMsg: '【ToUserId】 have not linked LINE Account' }, {
            //     where: {
            //       AutoCounter: msgitem.AutoCounter
            //     }
            //   })//LineBotPushMsgBank.update
             }
          // })//UsersLineInfo.then
      })//msgData.map
    })//LineBotPushMsgBank.findAll
};