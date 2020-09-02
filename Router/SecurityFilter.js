const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.send('400 Bad Request', 400);
});
router.post('/', function (req, res) {
    res.send('400 Bad Request', 400);
});
router.put('/', function (req, res) {
    res.send('400 Bad Request', 400);
});
router.patch('/', function (req, res) {
    res.send('400 Bad Request', 400);
});
router.delete('/', function (req, res) {
    res.send('400 Bad Request', 400);
});
module.exports = router;
