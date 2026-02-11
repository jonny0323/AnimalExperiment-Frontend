import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Main from './MainContainer.jsx';

function App() {
  const [step, setStep] = useState(1); // 1~4단계 관리
  const [researchData, setResearchData] = useState({
    topic: '',
    summary: null,
    tableData: [],
    analysis: null
  });

  // 상태 업데이트 함수
  const updateData = (newData) => {
    setResearchData(prev => ({ ...prev, ...newData }));
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* 왼쪽 사이드바 (이미지 page3_2 참고) */}
      <Sidebar currentStep={step} setStep={setStep} />
      
      <div className="flex-1 flex flex-col">
        {/* 상단 헤더 (로그인/회원가입) */}
        <Header />
        
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto">
          <Main 
            step={step} 
            setStep={setStep} 
            data={researchData} 
            updateData={updateData} 
          />
        </main>
      </div>
    </div>
  );
}

export default App;