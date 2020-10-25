const axios = require('axios');
const config = require('./config/config');
const util = require('util');


function dateToTimestamp(date) {
  return new Date(date).getTime();
}

async function getBinanceData() {
  try {
    console.log(`CONFIG:${util.inspect(config)}`);

    //  [0] - Open time | [1] - Open | [2] - High | [3] - Low | [4] - Close |
    const response = await axios.get('https://fapi.binance.com/fapi/v1/klines', {
      params: {
        symbol: config.symbol,
        interval: config.interval,
        startTime: dateToTimestamp(config.startDate),
        endTime: dateToTimestamp(config.endDate),
        limit: 1500
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getBinanceData();