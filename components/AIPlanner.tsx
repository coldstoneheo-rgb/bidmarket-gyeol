import React, { useState } from 'react';
import { generatePlanningDoc } from '../services/geminiService';
import { PlannerMessage } from '../types';

const AIPlanner: React.FC = () => {
  const [messages, setMessages] = useState<PlannerMessage[]>([
    {
      role: 'model',
      type: 'text',
      content: '반갑습니다. 시간의 결을 잇는 공간, **Gyeol(결)**의 기획실입니다.\n\n단순한 물건의 이동이 아닌, 가치와 이야기의 전승을 위한 시스템을 설계하고 있습니다. 어떤 이야기를 나누고 싶으신가요?'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAction = async (promptType: 'prd' | 'architecture' | 'benchmark') => {
    setLoading(true);
    let prompt = "";
    
    switch(promptType) {
        case 'prd':
            prompt = "개인 간 프리미엄 경매 및 가치 공유 플랫폼 'Gyeol(결)'의 PRD를 작성해줘. '소장품', '사연(Storytelling)', '가치 인증'이 핵심 키워드야.";
            break;
        case 'architecture':
            prompt = "Gyeol(결) 플랫폼의 신뢰성과 감성을 기술적으로 구현하기 위한 아키텍처를 설계해줘. (Gemini: 스토리텔링 생성, Claude: 진품 인증 스마트 컨트랙트 등)";
            break;
        case 'benchmark':
            prompt = "기존 중고거래(당근)와 차별화된 Gyeol(결)만의 브랜드 전략을 분석해줘. 아날로그 감성을 디지털 플랫폼에 어떻게 녹여낼지 제안해줘.";
            break;
    }

    const userMsg: PlannerMessage = { role: 'user', content: prompt, type: 'text' };
    setMessages(prev => [...prev, userMsg]);

    const result = await generatePlanningDoc(prompt);

    setMessages(prev => [...prev, { role: 'model', content: result, type: 'markdown' }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-brand-50">
      <div className="bg-brand-50/90 backdrop-blur border-b border-brand-200 p-4 sticky top-0 z-10 flex justify-between items-end">
        <div>
            <h2 className="text-lg font-serif font-bold text-brand-900 flex items-center gap-2">
            기획실 (Archive)
            </h2>
            <p className="text-[10px] text-brand-400 mt-1 uppercase tracking-widest">System Architect & Brand Director</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center text-brand-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-5 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-brand-800 text-brand-50 rounded-2xl rounded-tr-none' 
                : 'bg-white border border-brand-100 text-brand-900 rounded-2xl rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-7 font-light">
                  {msg.content}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
             <div className="flex justify-start">
                <div className="bg-white border border-brand-100 p-4 shadow-sm flex items-center gap-2 rounded-2xl rounded-tl-none">
                    <span className="text-xs text-brand-400 font-serif italic">생각을 정리하는 중...</span>
                </div>
            </div>
        )}
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-brand-50 via-brand-50/50 to-transparent">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 justify-center">
              <button 
                onClick={() => handleAction('prd')}
                disabled={loading}
                className="flex-shrink-0 bg-white border border-brand-300 text-brand-800 px-5 py-2.5 rounded-sm text-xs font-serif shadow-sm active:scale-95 transition-transform hover:bg-brand-50"
              >
                  기획서 작성
              </button>
              <button 
                onClick={() => handleAction('architecture')}
                disabled={loading}
                className="flex-shrink-0 bg-white border border-brand-300 text-brand-800 px-5 py-2.5 rounded-sm text-xs font-serif shadow-sm active:scale-95 transition-transform hover:bg-brand-50"
              >
                  시스템 설계
              </button>
              <button 
                onClick={() => handleAction('benchmark')}
                disabled={loading}
                className="flex-shrink-0 bg-white border border-brand-300 text-brand-800 px-5 py-2.5 rounded-sm text-xs font-serif shadow-sm active:scale-95 transition-transform hover:bg-brand-50"
              >
                  브랜드 전략
              </button>
          </div>
      </div>
    </div>
  );
};

export default AIPlanner;