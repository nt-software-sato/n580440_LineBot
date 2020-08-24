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
const moment = require('moment');

const config = process.env;

const lineRequest = axios.create({
  baseURL: 'https://api.line.me/v2/bot',
  headers: { 'Authorization': `Bearer ${config.channelAccessToken}` }
});


const accAuthRequest = axios.create({
  baseURL: 'http://phm.580440.com.cn/52279/line',
  // headers: { 'Authorization': `Bearer ${config.channelAccessToken}` }
});





const client = new line.Client(config);
///////////////////////////////////////////////////////


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








router.post('/', function (req, res) {

  Model.SecureToken.findOne({
    where: {
      Token: req.body.token
    },
    order: [['AutoCounter', 'DESC']]
  })
    .then((tokenData) => {
      let now = new Date();
      now.setMinutes(now.getMinutes() + 480);
      let dateDiff = (now.getTime() - tokenData.IssueTime.getTime()) / 1000 / 60;
      if (tokenData != null && dateDiff < 5) {


        // if (1==1) {
        let lineId = tokenData.UserLineId;
        let accountId = req.body.account;
        let password = md5(req.body.password);


        let memberCert = {
          "Id": accountId,
          "Password": password
        }


        // let memberCert = {
        //   "Id": "TC001",
        //   "Password": "e10adc3949ba59abbe56e057f20f883e"
        // }



        accAuthRequest.patch(`/reg/${lineId}`, memberCert)
          // .then(_res => _res.json())
         
          .then((data) => {
            console.log('OK///////////')
            console.log(data);
            console.log('OK///////////')
             let r_status = data.StatusCode || data.Code;
             let r_messages = data.Messages;
            // console.log({ r_status, r_messages });

             res.json({ status: "200", Msg: r_messages });




          })
          .catch(err => {
            let data=err.response.data;
            let r_status = data.StatusCode || data.Code;
            let r_messages = data.Messages;
            console.error("/ERROR/////////////")
            console.error(err.response.data);
            res.json({ status: "400", Msg: `[ERROR#${r_status}]${r_messages}` });
            console.error("/ERROR/////////////")
          })










        //res.json({ status: "200", Msg: "Auth Success", nonce: tempNonce });
        console.log(dateDiff);
        // console.log(moment(moment.duration(new Date().diff(tokenData.IssueTime))).format("hh:mm:ss"))
        // Model.Users.count({
        //   where: { UserId: req.body.account, Password: md5(req.body.password) },
        // }).then((count) => {
        //   if (count == '0') {
        //     Model.SecureToken.update({ Used: 1 }, {
        //       where: {
        //         AutoCounter: tokenData.AutoCounter
        //       }
        //     })
        //     res.json({ status: "400", Msg: "帳號認證失敗" });
        //   } else {
        //     Model.SecureToken.update({ Used: 1 }, {
        //       where: {
        //         AutoCounter: tokenData.AutoCounter
        //       }
        //     })
        //     let tempNonce = nonce();
        //     Model.UsersLineInfo.create({ UserId: req.body.account, token: req.body.token, nonce: tempNonce }).catch(() => { });
        //     res.json({ status: "200", Msg: "Auth Success", nonce: tempNonce });
        //   }
        // });
      } else {
        res.json({ status: "400", Msg: "[ERROR]綁定連結已過期" });
      }
    })
  // Model.Users.count({
  //   where: { UserId: req.body.account, Password: md5(req.body.password) },
  // }).then((count) => {
  //   if (count == '0') {
  //     res.json({ status: "400", Msg: "Auth Fail" });
  //   } else {
  //     let tempNonce = nonce();
  //     Model.UsersLineInfo.create({ UserId: req.body.account, token: req.body.token, nonce: tempNonce });
  //     res.json({ status: "200", Msg: "Auth Success", nonce: tempNonce });
  //   }
  // });
  return;
})
module.exports = router;