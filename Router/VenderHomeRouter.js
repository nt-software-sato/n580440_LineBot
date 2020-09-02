const express = require("express");
const router = express.Router();

const LineConnectAuth = require(`${g_svrRoot}/Controller/Vender/LineConnectAuth`);
const LineRedirectByToken = require(`${g_svrRoot}/Controller/Vender/LineRedirectByToken`);

router.use('/LineConnectAuth', LineConnectAuth.checkAccount);
router.use('/LineRedirectByToken', LineRedirectByToken.LineRedirectByToken);

module.exports = router;

