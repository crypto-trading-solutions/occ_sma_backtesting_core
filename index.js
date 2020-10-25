const axios = require('axios');
const sma = require('sma');
const util = require('util');

const config = require('./config/backTestConfig');
const dateToTimestamp = require('./utils/dateUtils');
const { processKlinesdata, makeScaledTimeframeData } = require("./utils/klinesDataUtils")

async function getBinanceData() {
  console.log(`CONFIG:${util.inspect(config)}`);

  //  [0] - Open time | [1] - Open | [2] - High | [3] - Low | [4] - Close |
  axios.get('https://fapi.binance.com/fapi/v1/klines', {
    params: {
      symbol: config.symbol,
      interval: config.interval,
      startTime: await dateToTimestamp(config.startDate),
      endTime: await dateToTimestamp(config.endDate),
      limit: 1500
    }
  }).then(async function (response) {
    let initialTimeframeData = await processKlinesdata(response.data);

    let scaledTimeframeData = 0;
    console.log(initialTimeframeData);
  })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });;

}

getBinanceData();