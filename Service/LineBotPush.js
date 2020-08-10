'use strict';
require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const app = express();
const router = express.Router();
const axios = require("axios");
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

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


const LineBotPushMsgBanks = n580440_Line.define('LineBot_PushMsg_Banks', {
  AutoCounter: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  Subject: {
    type: Sequelize.STRING,
  },
  Content: {
    type: Sequelize.STRING,
  },
  ToUserId: {
    type: Sequelize.STRING,
  },
  Result: {
    type: Sequelize.STRING,
  }
}, { timestamps: false });





// let pushMsg = {
//   "type": "text",
//   "text": "【案件處裡通知】\n\n以下案件請盡快與相關單位聯繫處裡\n\n\n客戶名稱：『客戶名稱』\n單位名稱：『單位名稱』\n報修單號：『報修單號』\n報修品項：『報修品項』\n要求時效：『要求時效』\n\n點擊下列連結查看案件詳情，如有疑問請聯繫580440報修中心，謝謝！\n\n『http://www.example.com』\n"
// }



let pushMsg = {
  "type": "text",
  "text": "【案件處裡通知】\n\n以下案件請盡快與相關單位聯繫處裡\n\n\n客戶名稱：『客戶名稱』\n單位名稱：『單位名稱』\n報修單號：『報修單號』\n報修品項：『報修品項』\n要求時效：『要求時效』\n\n點擊下列連結查看案件詳情，如有疑問請聯繫580440報修中心，謝謝！\n\n『http://www.example.com』\n"
}




module.exports.PushAction = function (msg) {


  LineBotPushMsgBanks.findAll({
    where: {
      Result: {[Op.is]: null }
    }
  })
    .then(result => {

 console.log(result[0]);

      //  result.rows.map(item => {
      //    console.log(item);
      //   //  console.log(`${item.Subject}IIIII${item.Content}IIIII${item.ToUserId}`);

      //  })

    })

  client.pushMessage('U750245f922c3019ab64a8220563e349b', pushMsg);











 // console.log(config);

  //console.log('dddddddd');
};