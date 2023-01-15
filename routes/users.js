var express = require('express');
var router = express.Router();
const config = require("../config.json");
const axios = require("axios");

router.get('/', async function(req, res, next) {
  const deviceId = 1;

  try {
    const resMeasurements = await axios.get(config.API_URL + "measurements/" + deviceId);
    const resSentiment = await axios.get(config.API_URL + "sentiment/all/" + deviceId);
    console.log(resSentiment);
    res.render('users', { measurements: resMeasurements.data.result, sentiment: resSentiment.data.result});
  }
  catch (err) {
    res.render('users', { msg: "Backend error" });
  }
});

module.exports = router;
