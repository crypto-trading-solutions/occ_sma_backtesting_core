const axios = require('axios');
const sma = require('sma');
const util = require('util');

const config = require('./config/backTestConfig');
const dateToTimestamp = require('./utils/dateUtils');

async function processKlinesdata(data) {
  let processedData = new Array();
  let elementBufferMap = new Map();

  data.forEach(element => {
    elementBufferMap.set("openTime", element[0]);
    elementBufferMap.set("openPrice", element[1]);
    elementBufferMap.set("closePrice", element[4]);
    processedData.push(elementBufferMap);
    elementBufferMap = new Map();
  });
  return processedData;
}

async function makeScaledTimeframeData(data)
{
  let processedData = new Array();
  for(let i = 0; i < data.length; ++i)
  {
    if(i % config.smaMfar == 0)
    {
      processedData.push(data[i]);
    }
  }
}

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