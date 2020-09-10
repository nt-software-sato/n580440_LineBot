const express = require("express");
const router = express.Router();

const LineConnectAuth = require(`${g_svrRoot}/Controller/Client/LineConnectAuth`);
const LineRedirectByToken = require(`${g_svrRoot}/Controller/Client/LineRedirectByToken`);

router.use('/LineConnectAuth', LineConnectAuth.checkAccount);
 router.use('/LineRedirectByToken', LineRedirectByToken.LineRedirectByToken);

module.exports = router;

