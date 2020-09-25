'use strict';
require('dotenv').config();
const config = process.env;
// const line = require('@line/bot-sdk');
// const express = require('express');
// const app = express();
// const router = express.Router();
const axios = require("axios");
// const md5 = require("md5");
// const nonce = require('nonce')();
// const { Sequelize } = require('sequelize');
// let Model = require('../../Model/LineBotModel')
// const moment = require('moment');

// const config = process.env;

// const lineRequest = axios.create({
//     baseURL: 'https://api.line.me/v2/bot',
//     headers: { 'Authorization': `Bearer ${config.channelAccessToken}` }
// });

// const accAuthRequest = axios.create({
//     baseURL: 'http://phm.580440.com.cn/52279/line',
//     // headers: { 'Authorization': `Bearer ${config.channelAccessToken}` }
// });

// const client = new line.Client(config);

// let GetUserInfo = async (uid) => {
//     return accAuthRequest.get(`/signin/${uid}`, {})
//         .then(res => res.data.o)
//         .then(data => {
//             // console.warn("////////")
//             // console.log(data)
//             return JSON.parse(JSON.stringify(data[0]));
//         })
// }
///////////////////////////////////////////////////////

module.exports = {
    LineRedirectByToken: function (req, res) {
        console.log(req.body.t)
        console.log('////')
        axios({
            headers: {'Authorization': `Bearer ${req.body.t}`},
            method: 'get',
            url: 'https://api.line.me/v2/profile',
            data: {}
        })
            .then((_res) => {
                console.log(_res.data.userId);
                res.json({p: `https://phm.580440.com.cn/linep01/index.html?t=${_res.data.userId}/`})
            })
            .catch(() => {
                console.log("err 400")
                res.send('need Login!!', 400);
            })
    },
}

// router.post('/', function (req, res) {
//
//
// })
//module.exports = router;