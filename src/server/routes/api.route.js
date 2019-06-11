var express = require('express');
var controller = require('../controller/api.controller');

var router = express.Router();


router.get("/", controller.index);
router.post("/", controller.postIssue);


module.exports = router;