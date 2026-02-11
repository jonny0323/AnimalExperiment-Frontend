export default function Sidebar({ currentStep, setStep }) {
  return (
    <div className="w-20 lg:w-64 bg-white border-r min-h-screen p-4 flex flex-col gap-4">
      <div>
      {/* public/favicon.svg에 있다면 아래처럼 바로 접근 */}
      <img src="/LinkLab.png" className="w-[90px] h-auto"/>
    </div>
      <button onClick={() => setStep(1)} className={`p-3 rounded-xl text-left ${currentStep === 1 ? 'bg-blue-50 text-blue-600' : ''}`}>새로운 질문</button>
      <button onClick={() => setStep(1)} className={`p-3 rounded-xl text-left ${currentStep === 2 ? 'bg-blue-50 text-blue-600' : ''}`}>채팅 기록 검색</button>
    </div>
  );
}