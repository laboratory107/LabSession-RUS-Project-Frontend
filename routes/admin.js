var express = require('express');
var router = express.Router();
const config = require("../config.json");
const axios = require("axios");

router.get('/', function (req, res, next) {
  const deviceId = 1;

  axios.get(config.API_URL + "temp" + deviceId)
    .then(resp => res.render('admin', { data: resp.data.result }))
    .catch(err => res.render('admin', { msg: "Backend error" }));

});

module.exports = router;
