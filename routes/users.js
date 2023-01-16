var express = require('express');
var router = express.Router();
const config = require("../config.json");
const axios = require("axios");

router.get('/:id', async function(req, res, next) {
  const deviceId = req.params.id;

  try {
    const resMeasurements = await axios.get(config.API_URL + "measurements/" + deviceId);
    const resSentiment = await axios.get(config.API_URL + "sentiment/all/" + deviceId);

    res.render('users', { measurements: resMeasurements.data.result, sentiment: resSentiment.data.result});
  }
  catch (err) {
    res.render('users', { msg: "Backend error" });
  }
});

module.exports = router;
