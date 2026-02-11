import React, { useState } from 'react';
import { Paperclip, Sparkles, ArrowRight, Search, Loader2 } from 'lucide-react'; // Loader2 추가

export default function Step1Input({ onNext }) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const categories = ["연구/학술", "허가", "임상개발", "제조/품질", "사업개발", "의료/투자"];

  const handleSearch = () => {
    if (inputValue.trim()) {
      setIsLoading(true); // 로딩 시작
      
      // 1초 뒤에 데이터 전달 및 페이지 이동
      setTimeout(() => {
        onNext(inputValue);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-[#F8F9FA] px-4">
      
      {/* 로고 및 타이틀 영역 */}
      <div className="text-center mb-12">
        <div className="flex justify-center w-full">
          <img src="/LinkLab.png" className="w-[200px] h-auto" alt="LinkLab Logo" />
        </div>
        <p className="text-xl font-medium text-gray-700">연구의 시작부터 끝까지, 당신의 가장 똑똑한 AI 파트너</p>
      </div>

      {/* 메인 검색 컨테이너 */}
      <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
        
        {/* 입력창 상단 */}
        <div className="mb-6">
          <textarea 
            className="w-full text-xl outline-none resize-none placeholder-gray-300 min-h-[100px]"
            placeholder="실험 가설을 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading} // 로딩 중 입력 방지
          />
        </div>

        {/* 툴바 영역 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4 text-gray-400">
            <button className="hover:text-blue-500 transition"><Paperclip size={20} /></button>
          </div>
          
          {/* 전송 버튼: 로딩 시 아이콘 변경 및 애니메이션 */}
          <button 
            onClick={handleSearch}
            disabled={isLoading || !inputValue.trim()}
            className={`p-3 rounded-full transition-all shadow-lg shadow-blue-200 flex items-center justify-center min-w-[48px] min-h-[48px] ${
              isLoading ? 'bg-blue-400' : 'bg-[#3B82F6] hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <Loader2 size={24} className="animate-spin text-white" />
            ) : (
              <ArrowRight size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* 카테고리 태그 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(tag => (
            <span 
              key={tag} 
              className="px-4 py-1.5 border border-gray-100 rounded-full text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 cursor-pointer transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 하단 추천 질문 */}
        <div className="bg-gray-50/50 rounded-2xl p-5 flex gap-3 border border-gray-50">
          <Search size={18} className="text-blue-400 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-400 leading-relaxed font-medium">
            ISO 11348-3 표준시험법에 기반한 생분해성 플라스틱 침출수의 초기 및 최종 발광도 측정을 통한 독성 수치(EC50, TU) 산출해줘
          </p>
        </div>
      </div>

      {/* 최하단 안내 문구 */}
      <div className="mt-8 flex items-center gap-2 text-[12px] text-blue-400 bg-blue-50/50 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-50 transition">
        🐾 동물실험 윤리 위원회 가이드를 준수한 실험이 설계됩니다. ❯
      </div>
    </div>
  );
}