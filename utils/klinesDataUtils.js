
module.exports = {

    processKlinesdata:
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
        },

    makeScaledTimeframeData:
        async function makeScaledTimeframeData(data) {
            let processedData = new Array();
            for (let i = 0; i < data.length; ++i) {
                if (i % config.smaMfar == 0) {
                    processedData.push(data[i]);
                }
            }
        }

};