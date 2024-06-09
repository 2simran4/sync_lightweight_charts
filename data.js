export const generateLineData = (minValue, maxValue, maxDailyGainLoss = 1000) => {
    const res = [];
    const time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
    for (let i = 0; i < 500; ++i) {
      const previous = res.length > 0 ? res[res.length - 1] : { value: 0 };
      const newValue = previous.value + ((Math.random() * maxDailyGainLoss * 2) - maxDailyGainLoss);
  
      res.push({
        time: time.getTime() / 1000,
        value: Math.max(minValue, Math.min(maxValue, newValue))
      });
  
      time.setUTCDate(time.getUTCDate() + 1);
    }
    return res;
  };
  
  export const generateCandlestickData = (minValue, maxValue) => {
    const res = [];
    const time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
    for (let i = 0; i < 500; ++i) {
      const open = minValue + Math.random() * (maxValue - minValue);
      const close = minValue + Math.random() * (maxValue - minValue);
      const high = Math.max(open, close) + Math.random() * (maxValue - minValue) * 0.1;
      const low = Math.min(open, close) - Math.random() * (maxValue - minValue) * 0.1;
  
      res.push({
        time: time.getTime() / 1000,
        open: open,
        high: high,
        low: low,
        close: close
      });
  
      time.setUTCDate(time.getUTCDate() + 1);
    }
    return res;
  };
  
  export const generateBuySellSignals = (candlestickData) => {
    const markers = [];
  
    for (let i = 1; i < candlestickData.length; ++i) {
      const prev = candlestickData[i - 1];
      const curr = candlestickData[i];
  
      if (curr.close > prev.close) {
        markers.push({
          time: curr.time,
          position: 'aboveBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'Buy'
        });
      } else if (curr.close < prev.close) {
        markers.push({
          time: curr.time,
          position: 'belowBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'Sell'
        });
      }
    }
  
    return markers;
  };
  