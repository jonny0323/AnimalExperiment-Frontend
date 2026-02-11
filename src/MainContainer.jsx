import React from 'react';
import Step1Input from './pages/Step1Input.jsx';
import Step2Summary from './pages/Step2Summary.jsx';
import Step3Table from './pages/Step3Table.jsx';
import Step4Dashboard from './pages/Step4Dashboard.jsx';

export default function MainContainer({ step, setStep, data, updateData }) {
  
  // [Step 1 -> 2] 초기 가설 기반 리포트 생성
  const handleStep1Submit = async (topic) => {
    updateData({ topic });
    setStep(2); 
    try {
      const res = await fetch('https://vinegarbox.work/api/research-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const result = await res.json();
      updateData({ ...result }); 
    } catch (error) {
      console.error("초기 설계 생성 실패:", error);
    }
  };

  // 🔥 [Step 2 전용] 대화를 통한 리포트 실시간 수정 (추가된 부분)
  const handleStep2ChatUpdate = async (message) => {
    try {
      const res = await fetch('https://vinegarbox.work/api/refine-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 현재 데이터(data)와 사용자의 수정 요청 메시지(message)를 함께 전송
        body: JSON.stringify({ currentData: data, message })
      });

      const updatedResult = await res.json();
      
      // AI가 보내온 새로운 summary와 tableSchema로 상태를 덮어씌움 -> 화면 자동 갱신
      updateData({ ...updatedResult }); 
    } catch (error) {
      console.error("리포트 수정 실패:", error);
    }
  };

  // [Step 3 -> 4] 입력 데이터 기반 최종 분석
  const handleStep3Submit = async (tableRows) => {
    setStep(4);
    try {
      const res = await fetch('https://vinegarbox.work/api/analyze-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableData: tableRows, topic: data.topic })
      });
      const result = await res.json();
      updateData({ analysis: result });
    } catch (error) {
      console.error("최종 분석 실패:", error);
    }
  };

  // 단계별 렌더링 로직
  switch (step) {
    case 1: 
      return <Step1Input onNext={handleStep1Submit} />;
    case 2: 
      return (
        <Step2Summary 
          data={data} 
          onNext={() => setStep(3)} 
          onChatUpdate={handleStep2ChatUpdate} // 수정 함수 전달
        />
      );
    case 3: 
      return <Step3Table data={data} onNext={handleStep3Submit} />;
    case 4: 
      return <Step4Dashboard data={data} />;
    default: 
      return <Step1Input />;
  }
}