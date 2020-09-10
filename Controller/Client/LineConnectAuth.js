'use strict';
// require('dotenv').config();
// const config = process.env;
const axios = require("axios");
const md5 = require("md5");

const Model = require(`${g_svrRoot}/Model/LineBotModel`)

const accAuthRequest = axios.create({
    baseURL: 'http://phm.580440.com.cn/52279/line/s/',
});

module.exports = {
    checkAccount: function (req, res) {
        //   console.log(req.body);
        const reqToken = req.body.token || '';
        // const accountId = req.body.account || '';
        // const password = md5(req.body.password) || '';
        // const memberCert = {
        //     "Id": accountId,
        //     "Password": password
        // };


        // if (req.body.isAdmin) {
        //     res.json(req.body.Admin)
        //
        // } else {
        //     res.json(req.body.User)
        // }


        Model.SecureToken.findOne({
            where: {
                Token: reqToken
            },
            order: [['AutoCounter', 'DESC']]
        })
            .then((tokenData) => {
                let dateDiff = 9999999;
                if (tokenData != null) {
                    let now = new Date();
                    now.setMinutes(now.getMinutes() + 480);
                    dateDiff = (now.getTime() - tokenData.IssueTime.getTime()) / 1000 / 60;
                }
                if (tokenData != null && dateDiff < 5) {
                    let lineId = tokenData.UserLineId;
                    // let lineId =  "TEST";
                    let authBody = (req.body.isAdmin) ? req.body.Admin : req.body.User;
                    let isUnitManager = req.body.User.isUnitManager || 0;
                    let authURL = (req.body.isAdmin) ? `/reg/${lineId}` : `reg/${lineId}/${req.body.User.passCode}?isUnitManager=${isUnitManager}`;

                    console.log(`///////////`)
                    console.log(req.body.isAdmin);
                    console.log(authURL);
                    console.log(authBody);


                    accAuthRequest.patch(`${authURL}`, authBody)
                        .then((data) => {
                            console.log('OK///////////')
                            console.log(data);
                            console.log('OK///////////')
                            let r_status = data.StatusCode || data.Code;
                            let r_messages = data.Messages;
                            // console.log({ r_status, r_messages });

                            res.json({status: "200", Msg: r_messages});
                        })
                        .catch(err => {
                            let data = err.response.data;
                            let r_status = data.StatusCode || data.Code;
                            let r_messages = data.Messages;
                            // console.error("/ERROR/////////////")
                            ///console.error(err);
                            res.json({status: "400", Msg: `[ERROR#${r_status}]${r_messages}`});
                            // console.error("/ERROR/////////////")
                        })
                    // console.log(dateDiff);


                } else {
                    res.json({status: "400", Msg: "[ERROR]綁定連結已過期"});
                }
            })
        // return;
    },
}
