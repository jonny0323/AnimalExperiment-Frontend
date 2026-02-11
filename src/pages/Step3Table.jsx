import React, { useState } from 'react';
import { Calendar, ShieldAlert, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function Step3Table({ data, onNext }) {
  const recordDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
}).format(new Date());
  const headers = data?.tableSchema?.headers || ["Sample", "Dilution Level", "I₀ (Initial)", "Iₜ (30 min)", "Avg Growth (%)"];

  const [rows, setRows] = useState([
    { id: 1, values: ["", "", "", "", "-"] },
    { id: 2, values: ["", "", "", "", "-"] }
  ]);

  // 성장률 계산 공식: ((Vt - V0) / V0) * 100
  const calculateGrowth = (initialStr, finalStr) => {
    const v0 = parseFloat(initialStr.replace(/,/g, ''));
    const vt = parseFloat(finalStr.replace(/,/g, ''));
    if (isNaN(v0) || isNaN(vt) || v0 === 0) return "-";
    const growth = ((vt - v0) / v0) * 100;
    return `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`;
  };

  const handleInputChange = (rIdx, cIdx, val) => {
    const newRows = [...rows];
    newRows[rIdx].values[cIdx] = val;
    if (cIdx === 2 || cIdx === 3) {
      newRows[rIdx].values[4] = calculateGrowth(newRows[rIdx].values[2], newRows[rIdx].values[3]);
    }
    setRows(newRows);
  };

  const addRow = () => setRows([...rows, { id: Date.now(), values: ["", "", "", "", "-"] }]);
  const removeRow = (id) => rows.length > 1 && setRows(rows.filter(r => r.id !== id));

  return (
    <div className="p-12 bg-[#F8F9FA] min-h-screen animate-in slide-in-from-right duration-500">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* 상단 시스템 바 (고정) */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-12 opacity-60">
            <div className="flex items-center gap-4">
              <Calendar className="text-gray-400" />
              <div><p className="text-[10px] font-black text-gray-400 uppercase">기록 일시</p><p className="text-sm font-black">{recordDate}</p></div>
            </div>
            <div className="flex items-center gap-4 border-l pl-12">
              <ShieldAlert className="text-gray-400" />
              <div><p className="text-[10px] font-black text-gray-400 uppercase">윤리위원회 인증</p><p className="text-sm font-black">미승인 (데이터 수집용)</p></div>
            </div>
          </div>
          <div className="text-[10px] font-bold text-blue-400 bg-blue-50/50 px-5 py-2 rounded-full">🔐 시스템 기록 모드</div>
        </div>

        {/* 메인 테이블 */}
        <div className="bg-white rounded-[50px] p-12 shadow-xl border border-gray-50">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">실험 데이터 입력 양식</h2>
            <button 
              onClick={() => onNext(rows)} 
              className="bg-[#3B82F6] text-white px-10 py-4 rounded-3xl font-bold shadow-lg hover:bg-blue-700 flex items-center gap-2"
            >
              결과 해석하기 <ArrowRight size={20} />
            </button>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[#BCC1C8] text-xs font-bold uppercase tracking-widest border-b">
                {headers.map((h, i) => <th key={i} className="py-6 px-4">{h}</th>)}
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((row, rIdx) => (
                <tr key={row.id} className="group hover:bg-blue-50/10 transition-colors">
                  {row.values.map((val, cIdx) => (
                    <td key={cIdx} className="py-4 px-2">
                      <input 
                        type="text" value={val} onChange={(e) => handleInputChange(rIdx, cIdx, e.target.value)}
                        readOnly={cIdx === 4}
                        placeholder={cIdx === 4 ? "자동계산" : "입력..."}
                        className={`w-full h-12 rounded-2xl px-5 text-sm font-bold outline-none transition-all ${cIdx === 4 ? 'bg-gray-50 text-blue-600' : 'bg-white border border-gray-100 focus:border-blue-400'}`}
                      />
                    </td>
                  ))}
                  <td className="px-2"><button onClick={() => removeRow(row.id)} className="text-gray-200 hover:text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addRow} className="mt-8 flex items-center gap-2 text-blue-500 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl">
            <Plus size={18} /> 데이터 행 추가
          </button>
        </div>
      </div>
    </div>
  );
}