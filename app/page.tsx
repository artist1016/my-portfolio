'use client';

import { useEffect, useRef, useState } from 'react';
// 不要直接导入 Plotly，改为动态导入

export default function Home() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState('');
  const [simulatedResponse, setSimulatedResponse] = useState('');
  const [plotlyLoaded, setPlotlyLoaded] = useState(false);

  // 动态加载 plotly.js
  useEffect(() => {
    import('plotly.js-dist').then((PlotlyModule) => {
      setPlotlyLoaded(true);
    });
  }, []);

  // 绘制图表（仅在 plotlyLoaded 为 true 时执行）
  useEffect(() => {
    if (!plotlyLoaded || !chartRef.current) return;

    // 动态导入后，从模块中获取 Plotly
    import('plotly.js-dist').then((Plotly) => {
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

      Plotly.newPlot(chartRef.current, [trace], layout);
    });
  }, [plotlyLoaded]);

  const handleSimulate = () => {
    if (!inputText.trim()) {
      setSimulatedResponse('请输入一个问题，例如：“发生火灾怎么办”');
      return;
    }
    const lower = inputText.toLowerCase();
    if (lower.includes('火灾')) {
      setSimulatedResponse('🔥 意图识别：【事件类型：火灾】。系统将返回火灾处置措施。\n\n在未来产品中，类似的技术可将您的自然语言需求转化为数据图表，如：“绘制火灾发生时安全撤离的的图示”，');
    } else if (lower.includes('地震')) {
      setSimulatedResponse('🌍 意图识别：【事件类型：地震】。系统将返回地震应急指南。');
    } else if (lower.includes('急救') || lower.includes('突发疾病')) {
      setSimulatedResponse('🚑 意图识别：【事件类型：突发疾病】。系统将返回急救措施。');
    } else {
      setSimulatedResponse('💡 意图识别：【通用查询】。系统将返回应急事件通用处理流程。\n\n将自然语言转化为精准的数据分析与可视化结果。');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 头部信息 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dai Yi</h1>
          <p className="text-xl text-gray-600">北京交通大学 · 计算机</p>
          <p className="text-gray-500 mt-2">
            全栈开发者&学习者  | 正在寻找远程前端 / AI产品开发 /人机交互方向 兼职
          </p>
        </div>

        {/* 技术栈 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">技术栈</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'Python', 'C++', 'Flask', 'Neo4j', 'React', 'Next.js', 'TypeScript',
              'FastAPI', 'Plotly.js', 'Git'
            ].map(tech => (
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
            <li>
              <strong>毕业设计：基于知识图谱的应急事件处置问答系统</strong> – 独立开发，Flask + Neo4j，AC算法实现问句分类，平均响应时间0.30秒。
              <a href="https://github.com/artist1016/QAsystem-knowledge-graph" className="text-blue-600 hover:underline ml-2" target="_blank" rel="noopener noreferrer">
                [GitHub]
              </a>
            </li>
            <li>
              <strong>个人作品集网站</strong> – 使用 Next.js / React 完成本网站，包含项目数据可视化与交互模拟。
              <a href="https://github.com/artist1016/my-portfolio" className="text-blue-600 hover:underline ml-2" target="_blank" rel="noopener noreferrer">
                [GitHub]
              </a>
            </li>
          </ul>
        </div>

        {/* 数据可视化模块：毕设算法性能对比 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">📊 进展与思考</h2>
          <p className="text-gray-600 mb-4">
            我的毕业设计实现了从自然语言到结构化查询的转换，这与“对话式数据分析”的理念一脉相承——都是通过理解用户意图，自动化完成复杂流程。
          </p>
          <div className="mb-4">
            <div ref={chartRef} style={{ width: '100%', height: '450px' }} />
            <p className="text-sm text-gray-500 text-center mt-2">
              * 基于设计性能评估数据，AC算法在轻量级场景中优势明显。
            </p>
          </div>
        </div>

        {/* 自然语言模拟器 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">💬 模拟我的问答系统 → 关联 </h2>
          <p className="text-gray-600 mb-4">
            下方模拟器展示我的毕业设计如何理解自然语言问题并分类。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入应急事件问题，如：“发生火灾怎么办”"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSimulate}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              识别意图
            </button>
          </div>
          {simulatedResponse && (
            <div className="bg-gray-100 p-4 rounded-md text-gray-800 whitespace-pre-line">
              <p className="font-medium">🤖 系统识别结果：</p>
              <p>{simulatedResponse}</p>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-4 text-center">
            * 实际毕业设计中，问句分类由 AC 算法自动完成，此处仅作演示。
          </p>
        </div>

        {/* 联系信息 */}
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">📫 联系我</h2>
          <p className="mb-2">邮箱：1137251662@qq.com</p>
          <p className="mb-2">
            GitHub：<a href="https://github.com/artist1016" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">github.com/artist1016</a>
          </p>
          <p>
            作品集源码：<a href="https://github.com/artist1016/my-portfolio" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub仓库</a>
          </p>
        </div>
      </div>
    </main>
  );
}