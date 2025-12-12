import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import AuctionCard from './components/AuctionCard';
import AuctionDetail from './components/AuctionDetail';
import AIPlanner from './components/AIPlanner';
import { NavTab, AuctionItem } from './types';

// Mock Data: Emotional, Story-driven items
const MOCK_ITEMS: AuctionItem[] = [
  {
    id: '1',
    title: '1985년, 아버지의 첫 필름 카메라',
    subtitle: '수많은 가족 여행을 기록했던 시간을 내놓습니다.',
    description: `아버지가 첫 월급으로 장만하셨다는 1985년산 필름 카메라입니다. \n\n단순한 기계가 아니라 저희 가족의 역사가 담겨있습니다. 셔터를 누를 때의 묵직한 감각과 필름을 감는 소리는 디지털이 흉내 낼 수 없는 깊이가 있죠. \n\n이제는 제가 관리하기 어려워, 이 카메라의 가치를 알고 소중히 다뤄주실 새로운 소장자를 찾습니다. 렌즈 곰팡이 없이 깨끗하며, 가죽 케이스에서 세월의 향기가 납니다.`,
    category: 'Vintage Camera',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    startingPrice: 150000,
    currentPrice: 280000,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 4), 
    sellerName: '시간여행자',
    sellerAvatarUrl: 'https://i.pravatar.cc/150?u=time',
    sellerRating: 4.9,
    location: '성북동 주택가',
    year: 1985,
    bids: [
        { id: 'b1', bidderName: '포토그래퍼J', amount: 180000, timestamp: new Date() },
        { id: 'b2', bidderName: '아날로그감성', amount: 280000, timestamp: new Date() }
    ]
  },
  {
    id: '2',
    title: '손때 묻은 가죽 서류가방',
    subtitle: '30년 근속의 영광과 땀이 배어있는 가방',
    description: `은퇴하신 저희 부장님께서 물려주신 가죽 가방입니다. \n\n이태리 베지터블 가죽으로 제작되어 사용할수록 광택이 살아나는 물건입니다. 중요한 계약이 있는 날이면 항상 이 가방을 드셨다고 해요. \n\n사회초년생이나 새로운 시작을 앞둔 분께 좋은 기운을 드리고 싶어 경매에 올립니다. 가죽 에센스로 꾸준히 관리해왔습니다.`,
    category: 'Leather Goods',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    startingPrice: 80000,
    currentPrice: 80000, 
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 48), 
    sellerName: '미생',
    sellerAvatarUrl: 'https://i.pravatar.cc/150?u=work',
    sellerRating: 4.5,
    location: '여의도',
    year: 1995,
    bids: []
  },
  {
    id: '3',
    title: '작자 미상의 도자기 화병',
    subtitle: '시골 할머니 댁 다락방에서 발견한 정적인 아름다움',
    description: `화려하지 않지만 볼수록 마음이 편안해지는 백자 화병입니다. \n\n할머니께서 시집오실 때 가져오셨다고 하니 족히 60년은 넘은 물건입니다. 들꽃 한 송이 꽂아두면 공간의 공기가 달라집니다. \n\n바닥에 작은 빙열이 있지만 물이 새지는 않습니다. 고요한 아름다움을 즐길 줄 아는 분께 갔으면 좋겠습니다.`,
    category: 'Ceramics',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop',
    startingPrice: 50000,
    currentPrice: 120000, 
    endTime: new Date(Date.now() + 1000 * 60 * 30), 
    sellerName: '여백의미',
    sellerRating: 5.0,
    location: '종로구 평창동',
    year: 1960,
    bids: [
         { id: 'b3', bidderName: '도예가', amount: 60000, timestamp: new Date() },
         { id: 'b4', bidderName: '갤러리K', amount: 120000, timestamp: new Date() },
    ]
  },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.HOME);
  const [items, setItems] = useState<AuctionItem[]>(MOCK_ITEMS);
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);

  const handleBid = (itemId: string, amount: number) => {
    setItems(prevItems => prevItems.map(item => {
        if (item.id === itemId) {
            return {
                ...item,
                currentPrice: amount,
                bids: [...item.bids, {
                    id: Math.random().toString(36).substr(2, 9),
                    bidderName: '나(Collector)',
                    amount: amount,
                    timestamp: new Date()
                }]
            };
        }
        return item;
    }));
    
    setSelectedItem(prev => {
        if (prev && prev.id === itemId) {
             return {
                ...prev,
                currentPrice: amount,
                bids: [...prev.bids, {
                    id: Math.random().toString(36).substr(2, 9),
                    bidderName: '나(Collector)',
                    amount: amount,
                    timestamp: new Date()
                }]
            };
        }
        return prev;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavTab.HOME:
        return (
          <div className="pb-24 px-5">
             {/* Brand Header */}
            <header className="sticky top-0 bg-brand-50/95 backdrop-blur-md z-40 py-5 mb-2 border-b border-brand-100 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-serif font-black text-brand-900 tracking-tight">Gyeol<span className="text-brand-500 text-sm ml-1 align-top">결</span></h1>
                    <p className="text-[10px] text-brand-400 tracking-widest uppercase mt-1">Archive of Value</p>
                </div>
                <div className="flex gap-4 text-brand-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
            </header>

            {/* Feed Layout */}
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <AuctionCard 
                    key={item.id} 
                    item={item} 
                    onClick={setSelectedItem} 
                />
              ))}
            </div>
            
            {/* FAB */}
            <button className="fixed bottom-24 right-5 bg-brand-900 text-white p-4 rounded-sm shadow-xl hover:bg-black transition-colors z-30 flex items-center gap-2 pr-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                <span className="font-serif text-sm tracking-widest">소장품 등록</span>
            </button>
          </div>
        );
      case NavTab.AI_PLANNER:
        return <AIPlanner />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-brand-300 gap-4 bg-brand-50">
            <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            <p className="font-serif italic text-sm">페이지를 준비하고 있습니다.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-brand-50 min-h-screen relative font-sans text-brand-900">
      <main className="h-screen w-full overflow-y-auto no-scrollbar">
          {renderContent()}
      </main>

      {selectedItem && (
        <AuctionDetail 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onBid={handleBid}
        />
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;