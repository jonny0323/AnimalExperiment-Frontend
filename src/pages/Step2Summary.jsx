import React, { useState } from 'react';
import { Beaker, Pencil, Table, Lightbulb, Paperclip, Send, ChevronRight, Loader2, Sparkles } from 'lucide-react';

export default function Step2Summary({ data, onNext, onChatUpdate }) {
  const [userInput, setUserInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // AI에게 수정을 요청하는 함수
  const handleChatSubmit = async () => {
    if (!userInput.trim() || isUpdating) return;
    
    setIsUpdating(true);
    // 부모 컴포넌트의 API 호출 함수 실행 (채팅 메시지 전달)
    await onChatUpdate(userInput); 
    setUserInput("");
    setIsUpdating(false);
  };

  if (!data?.summary) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-gray-400 animate-pulse text-lg">AI 연구원이 실험 리포트를 구성 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#F8F9FA] animate-in fade-in duration-500">
      
      {/* [왼쪽] 상세 실험 리포트 영역 (AI 대화에 따라 실시간 업데이트됨) */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
        {isUpdating && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-blue-600" size={32} />
              <p className="font-black text-blue-900">AI가 리포트 내용을 수정하고 있습니다...</p>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto bg-white rounded-[40px] p-12 shadow-sm border border-gray-100">
          <div className="mb-12">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">실험 주제</span>
            <h1 className="text-2xl font-black text-gray-900 mt-2 leading-snug">{data.summary.title}</h1>
          </div>

          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-green-600">
              <Beaker size={22} strokeWidth={3} />
              <h2 className="text-xl font-extrabold text-gray-900">실험 재료 및 기구 정리</h2>
            </div>
            <div className="space-y-6 pl-8">
              {data.summary.materials.map((m, i) => (
                <div key={i} className="text-gray-600 text-sm leading-relaxed">• {m}</div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-orange-500">
              <Pencil size={22} strokeWidth={3} />
              <h2 className="text-xl font-extrabold text-gray-900">실험 방법 정리</h2>
            </div>
            <div className="space-y-6 pl-8">
              {data.summary.methods.map((m, i) => (
                <div key={i} className="text-gray-600 text-sm leading-relaxed">{i + 1}. {m}</div>
              ))}
            </div>
          </section>

          <div className="mt-12 pt-10 border-t border-gray-50 flex flex-col gap-6">
             <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-blue-700 mb-1">데이터 입력 양식 제안</h4>
                  <p className="text-xs text-blue-400">수정된 내용에 맞춰 표 구조가 자동 업데이트됩니다.</p>
                </div>
                <button 
                  onClick={onNext}
                  className="bg-[#3B82F6] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition flex items-center gap-2"
                >
                  이 양식으로 확정 후 ➔ <ChevronRight size={18} />
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* [오른쪽] 사이드 패널: AI 대화 인터페이스 */}
      <div className="w-[380px] border-l bg-white p-8 flex flex-col gap-8">
        <div className="bg-[#F8F9FA] rounded-[32px] p-6 border border-gray-50">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Sparkles size={20} fill="currentColor" />
            <h4 className="font-bold text-gray-900 text-sm">리포트 수정 에이전트</h4>
          </div>
          
          {/* 변경된 부분: 텍스트를 버튼화하여 가독성과 클릭 유도 향상 */}
          <button 
            onClick={() => document.getElementById('chat-input').focus()}
            className="w-full py-4 px-4 bg-white border border-blue-100 rounded-2xl text-xs font-bold text-blue-600 shadow-sm hover:shadow-md transition-all text-center leading-relaxed"
          >
            "재료에 마취제 추가해줘" 등 <br/>
            수정사항을 아래에 입력하세요.
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-2">자주 요청하는 수정</p>
          {["실험 방법 더 구체적으로 써줘", "필요한 기구 목록 추가해줘", "대조군 설정 바꿔줘"].map((q, i) => (
            <button 
              key={i} 
              onClick={() => setUserInput(q)}
              className="w-full text-left px-4 py-3 rounded-2xl text-[13px] font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100"
            >
              "{q}"
            </button>
          ))}
        </div>

        <div className="mt-auto relative">
          <div className="bg-[#F8F9FA] rounded-[30px] p-4 border border-gray-100 min-h-[140px] flex flex-col shadow-inner focus-within:border-blue-200 transition-all">
            <textarea 
              id="chat-input"
              className="flex-1 bg-transparent outline-none text-sm resize-none placeholder-gray-300 font-medium"
              placeholder="AI에게 수정 요청하기..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSubmit();
                }
              }}
            />
            <div className="flex justify-between items-center mt-2">
              <button className="text-gray-400 hover:text-blue-500"><Paperclip size={18} /></button>
              <button 
                onClick={handleChatSubmit}
                disabled={!userInput.trim() || isUpdating}
                className={`p-2 rounded-full shadow-md transition-all ${
                  isUpdating ? 'bg-gray-300' : 'bg-[#3B82F6] text-white hover:bg-blue-700'
                }`}
              >
                {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}