import React, { useEffect, useRef } from 'react';
import { createChartWithSeries, synchronizeCharts } from './chart';
import { generateLineData, generateCandlestickData, generateBuySellSignals } from './data';

const App = () => {
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);
  const containerRef4 = useRef(null);

  useEffect(() => {
    const candlestickData1 = generateCandlestickData(100000, 3000000);
    const buySellMarkers1 = generateBuySellSignals(candlestickData1);
    const chart1 = createChartWithSeries(
      containerRef1.current,
      generateLineData(1000, 300000, 1500),
      candlestickData1,
      buySellMarkers1
    );

    const candlestickData2 = generateCandlestickData(0, 100);
    const buySellMarkers2 = generateBuySellSignals(candlestickData2);
    const chart2 = createChartWithSeries(
      containerRef2.current,
      generateLineData(0, 100, 20),
      candlestickData2,
      buySellMarkers2,
      '#ff0000'
    );

    const candlestickData3 = generateCandlestickData(0, 100);
    const buySellMarkers3 = generateBuySellSignals(candlestickData3);
    const chart3 = createChartWithSeries(
      containerRef3.current,
      generateLineData(0, 100, 20),
      candlestickData3,
      buySellMarkers3,
      '#00ff00'
    );

    const candlestickData4 = generateCandlestickData(0, 100);
    const buySellMarkers4 = generateBuySellSignals(candlestickData4);
    const chart4 = createChartWithSeries(
      containerRef4.current,
      generateLineData(0, 100, 20),
      candlestickData4,
      buySellMarkers4,
      '#ea6622'
    );

    const charts = [chart1, chart2, chart3, chart4];
    synchronizeCharts(charts);

    const handleResize = () => {
      charts.forEach(chart => {
        chart.resize(containerRef1.current.clientWidth, containerRef1.current.clientHeight);
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      charts.forEach(chart => chart.remove());
    };
  }, []);

  return (
    <div>
      <div ref={containerRef1} style={{ width: '100%', height: '150px', marginBottom: '10px' }} />
      <div ref={containerRef2} style={{ width: '100%', height: '150px', marginBottom: '10px' }} />
      <div ref={containerRef3} style={{ width: '100%', height: '150px', marginBottom: '10px' }} />
      <div ref={containerRef4} style={{ width: '100%', height: '150px' }} />
    </div>
  );
};

export default App;
