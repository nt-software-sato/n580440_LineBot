'use strict';
require('dotenv').config();
const config = process.env;

const line = require('@line/bot-sdk');
const client = new line.Client(config);
const {
    HTTPError,
    JSONParseError,
    ReadError,
    RequestError,
    SignatureValidationFailed,
} = require('@line/bot-sdk');
// const express = require('express');
// const app = express();
// const router = express.Router();
// const axios = require("axios");
const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;
let Model = require(`${g_svrRoot}/Model/LineBotModel`);

// const lineRequest = axios.create({
//     baseURL: 'https://api.line.me/v2/bot',
//     headers: {'Authorization': `Bearer ${config.channelAccessToken}`}
// });


module.exports = {
    PushAction: function (msg) {
        Model.BankOfLineMessages.findAll({
            where: {
                Status: 1
            }
        })
            .then(msgData => {

                msgData.map(msgitem => {
                    if (msgitem != null) {
                        let json = [msgitem.LineMessage_OpenId, msgitem.LineMessage_Message];
                        console.log(json);
                        client.pushMessage(msgitem.LineMessage_OpenId, JSON.parse(msgitem.LineMessage_Message))
                            .catch((err) => {
                                if (err instanceof HTTPError) {
                                    console.error(err.statusCode);
                                    console.error(err.originalError.response.data.message);
                                    Model.BankOfLineMessages.update({
                                        Status: err.statusCode,
                                        Remark: err.originalError.response.data.message
                                    }, {
                                        where: {
                                            Id: msgitem.Id
                                        }
                                    })//LineBotPushMsgBank.update
                                }
                            });
                        Model.BankOfLineMessages.update({Status: 5}, {
                            where: {
                                Id: msgitem.Id
                            }
                        })
                    }
                })
            })
    }
};
