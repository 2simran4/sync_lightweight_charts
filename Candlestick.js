import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

const data = [
  { time: '2023-06-01', open: 135, high: 140, low: 130, close: 138 },
  { time: '2023-06-02', open: 138, high: 142, low: 136, close: 140 },
  { time: '2023-06-03', open: 140, high: 145, low: 138, close: 143 },
  { time: '2023-06-04', open: 143, high: 147, low: 141, close: 145 },
  { time: '2023-06-05', open: 145, high: 150, low: 144, close: 148 },
];

const rsiData = [
  { time: '2023-06-01', value: 30 },
  { time: '2023-06-02', value: 32 },
  { time: '2023-06-03', value: 35 },
  { time: '2023-06-04', value: 33 },
  { time: '2023-06-05', value: 36 },
];

const Charts = () => {
  const candlestickChartRef = useRef(null);
  const rsiChartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const rsiSeriesRef = useRef(null);

  useEffect(() => {
    // Create Candlestick Chart
    const candlestickChart = createChart(candlestickChartRef.current, {
      width: candlestickChartRef.current.clientWidth,
      height: 300,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    const candlestickSeries = candlestickChart.addCandlestickSeries();
    candlestickSeries.setData(data);
    candlestickSeriesRef.current = candlestickSeries;

    // Create RSI Chart
    const rsiChart = createChart(rsiChartRef.current, {
      width: rsiChartRef.current.clientWidth,
      height: 150,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    const rsiSeries = rsiChart.addLineSeries();
    rsiSeries.setData(rsiData);
    rsiSeriesRef.current = rsiSeries;

    // Synchronize crosshairs
    const syncCrosshair = (sourceChart, targetChart, targetSeries) => {
      sourceChart.subscribeCrosshairMove(param => {
        if (!param || !param.point || !param.time) {
          targetChart.setCrosshairPosition(null);
          return;
        }

        const price = targetSeries.coordinateToPrice(param.point.y);
        const time = sourceChart.timeScale().coordinateToTime(param.point.x);

        targetChart.setCrosshairPosition({ price, time });
      });
    };

    syncCrosshair(candlestickChart, rsiChart, rsiSeries);
    syncCrosshair(rsiChart, candlestickChart, candlestickSeries);

    // Synchronize time scales
    const syncTimeScale = (sourceChart, targetChart) => {
      sourceChart.timeScale().subscribeVisibleTimeRangeChange(param => {
        targetChart.timeScale().setVisibleRange(param);
      });
    };

    syncTimeScale(candlestickChart, rsiChart);
    syncTimeScale(rsiChart, candlestickChart);

    // Resize charts on window resize
    const handleResize = () => {
      candlestickChart.applyOptions({ width: candlestickChartRef.current.clientWidth });
      rsiChart.applyOptions({ width: rsiChartRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      candlestickChart.remove();
      rsiChart.remove();
    };
  }, []);

  return (
    <div>
      <div ref={candlestickChartRef} />
      <div ref={rsiChartRef} style={{ marginTop: '20px' }} />
    </div>
  );
};

export default Charts;
