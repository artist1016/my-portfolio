'use client';  // 因为使用Plotly，需要客户端组件

import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function Home() {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plotRef.current) {
      // 示例数据：毕业设计中的问答响应时间对比（虚构）
      const data = [
        {
          x: ['AC算法', '关键词匹配', '机器学习'],
          y: [0.3, 0.8, 1.2],
          type: 'bar',
          marker: { color: ['#3b82f6', '#10b981', '#f59e0b'] },
          name: '响应时间(秒)',
        },
      ];
      const layout = {
        title: '问答系统不同算法性能对比',
        xaxis: { title: '算法' },
        yaxis: { title: '平均响应时间 (秒)' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      };
      Plotly.newPlot(plotRef.current, data, layout);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">代艺</h1>
          <p className="text-xl text-gray-600">北京交通大学 · 计算机科学与技术 2024届</p>
          <p className="text-gray-500 mt-2">热爱AI + 创意产品，全栈开发者</p>
        </div>

        {/* 技术栈 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">技术栈</h2>
          <div className="flex flex-wrap gap-3">
            {['Python', 'Flask', 'Neo4j', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI'].map(tech => (
              <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 项目亮点 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">项目亮点</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>毕业设计：基于知识图谱的应急事件处置问答系统（Flask + Neo4j）</li>
            <li>独立完成全栈开发、数据库设计与部署</li>
            <li>正在学习React/Next.js，并快速构建此个人展示页</li>
          </ul>
        </div>

        {/* 可视化图表 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">毕业设计算法性能对比</h2>
          <div ref={plotRef} style={{ width: '100%', height: '400px' }} />
          <p className="text-sm text-gray-500 mt-4 text-center">使用AC多模式匹配算法，平均响应时间仅0.30秒</p>
        </div>
      </div>
    </main>
  );
}