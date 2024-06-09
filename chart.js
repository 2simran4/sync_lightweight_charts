import { createChart, CrosshairMode } from 'lightweight-charts';

export const createChartWithSeries = (container, lineData, candlestickData = null, buySellMarkers = null, color = '#000000') => {
  const chart = createChart(container, {
    timeScale: {
      borderColor: "rgb(225, 226, 227)"
    },
    rightPriceScale: {
      autoScale: true,
      scaleMargins: {
        top: 0.1,
        bottom: 0.08,
      }
    },
    crosshair: {
      mode: CrosshairMode.Normal,
    },
  });

  const lineSeries = chart.addLineSeries({
    title: 'line',
    priceFormat: {
      minMove: 1,
      precision: 0,
    },
    color: color,
  });
  lineSeries.setData(lineData);

  if (candlestickData) {
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: 'rgba(255, 144, 0, 1)',
      downColor: '#000',
      borderDownColor: 'rgba(255, 144, 0, 1)',
      borderUpColor: 'rgba(255, 144, 0, 1)',
      wickDownColor: 'rgba(255, 144, 0, 1)',
      wickUpColor: 'rgba(255, 144, 0, 1)',
    });
    candlestickSeries.setData(candlestickData);

    if (buySellMarkers) {
      candlestickSeries.setMarkers(buySellMarkers);
    }
  }

  return chart;
};

export const synchronizeCharts = (charts) => {
  const onVisibleTimeRangeChanged = (targetChart, otherCharts) => ({ from, to }) => {
    otherCharts.forEach(chart => {
      chart.timeScale().setVisibleRange({ from, to });
    });
  };

  const onCrosshairMove = (targetChart, otherCharts) => (param) => {
    otherCharts.forEach(chart => {
      chart.setCrosshairPosition(param);
    });
  };

  charts.forEach((chart, index, arr) => {
    const otherCharts = arr.filter((_, i) => i !== index);
    chart.timeScale().subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged(chart, otherCharts));
    chart.subscribeCrosshairMove(onCrosshairMove(chart, otherCharts));
  });
};
