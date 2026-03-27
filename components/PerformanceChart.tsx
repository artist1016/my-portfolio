'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// 动态加载 Plotly，避免服务端渲染
const Plotly = dynamic(() => import('plotly.js-dist'), { ssr: false });

export default function PerformanceChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    (async () => {
      const PlotlyModule = await import('plotly.js-dist');
      const algorithms = ['AC算法', '关键词匹配', '机器学习'];
      const responseTimes = [0.30, 0.82, 1.21];
      const colors = ['#3b82f6', '#10b981', '#f59e0b'];

      const trace = {
        x: algorithms,
        y: responseTimes,
        type: 'bar',
        marker: { color: colors },
        text: responseTimes.map(t => `${t}s`),
        textposition: 'auto',
        name: '平均响应时间',
      };
      const layout = {
        title: '毕业设计：问答系统算法性能对比',
        xaxis: { title: '算法' },
        yaxis: { title: '响应时间 (秒)' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        height: 450,
        margin: { t: 50, b: 50, l: 50, r: 30 }
      };
      PlotlyModule.newPlot(chartRef.current, [trace], layout);
    })();
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '450px' }} />;
}