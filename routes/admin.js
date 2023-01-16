var express = require('express');
var router = express.Router();
const config = require("../config.json");
const axios = require("axios");

/*
{
  "result": [
    {
      "DeviceID": 1,
      "DeviceName": "Device001",
      "RoomDescription": "First"
    },
    {
      "DeviceID": 2,
      "DeviceName": "Device002",
      "RoomDescription": "First"
    }
  ]
}
*/

const getAllData = async (deviceId) => {
  const sentimentData = await axios.get(config.API_URL + "sentiment/avg/" + deviceId);
  return sentimentData.data.result;
};

router.get('/', async function (req, res, next) {
    try {
      const devicesData = await axios.get(config.API_URL + "devices");
      const devices = devicesData.data.result;

      const promises = devices.map(async (device) => {
        const sentimentData = await getAllData(device.DeviceID);
        return sentimentData[0];
      });
      
      const sentiments = await Promise.all(promises);

      res.render('admin', { devices: devices, sentiment: sentiments});
    }
    catch (err) {
      res.render('admin', { msg: "Backend error" });
    }
});

module.exports = router;
