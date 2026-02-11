import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Download, Share2, Activity, Zap, ShieldCheck, FileText, Lightbulb } from 'lucide-react';

export default function Step4Dashboard({ data }) {
  if (!data?.analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F8F9FA]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-xl font-black text-gray-800 animate-pulse">데이터 무결성 검증 및 리포트 생성 중...</p>
      </div>
    );
  }

  const { stats, chartData, conclusion, insights } = data.analysis;
  const icons = [<Activity size={20} />, <Zap size={20} />, <ShieldCheck size={20} />, <FileText size={20} />];

  return (
    <div className="p-10 bg-[#F8F9FA] min-h-screen overflow-y-auto custom-scrollbar animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-blue-500 font-bold text-xs tracking-widest mb-1 uppercase">AI Analysis Report</p>
            <h1 className="text-3xl font-black text-gray-900">{data.topic}</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2 bg-white border rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition"><Download size={18} /> PDF</button>
            <button className="flex items-center gap-2 px-6 py-2 bg-[#5E5CE6] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition"><Share2 size={18} /> Share</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-50 transition-all hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">{icons[i % 4]}</div>
                <span className="text-[10px] font-black text-gray-300">STAT_{i+1}</span>
              </div>
              <p className="text-xs text-gray-400 font-bold">{s.label}</p>
              <h3 className="text-2xl font-black text-gray-900">{s.value}</h3>
              <p className="text-[10px] text-gray-300 italic">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] shadow-sm h-[400px]">
            <h4 className="font-black text-gray-900 mb-6">시료별 결과 추이</h4>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={chartData.area}>
                <defs><linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fill="url(#colorV)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-8 rounded-[40px] shadow-sm h-[400px]">
             <h4 className="font-black text-gray-900 mb-6">시료별 비중 비교</h4>
             <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData.bar} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={12}>
                    {chartData.bar.map((_, i) => <Cell key={i} fill={i === 0 ? '#E2E8F0' : '#DBEAFE'} />)}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0F172A] rounded-[40px] p-12 text-white shadow-2xl flex gap-12">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded-full mb-6 tracking-widest">ANALYSIS SUMMARY</span>
            <h2 className="text-3xl font-black mb-6">실험 결과 요약 및 결론</h2>
            <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">{conclusion}</p>
          </div>
          <div className="w-80 bg-white/5 rounded-3xl p-6 border border-white/10">
            <h5 className="flex items-center gap-2 text-sm font-bold mb-6 text-yellow-400"><Lightbulb size={18} /> AI 인사이트</h5>
            <ul className="space-y-4 text-xs text-gray-400">
              {insights.map((ins, i) => <li key={i} className="flex gap-2"><span>•</span> {ins}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}