import React, { useState } from 'react';
import { AuctionItem, Bid } from '../types';

interface AuctionDetailProps {
  item: AuctionItem;
  onClose: () => void;
  onBid: (itemId: string, amount: number) => void;
}

const AuctionDetail: React.FC<AuctionDetailProps> = ({ item, onClose, onBid }) => {
  const isNoBids = item.bids.length === 0;
  const [bidAmount, setBidAmount] = useState<number>(
    isNoBids ? item.startingPrice : item.currentPrice + 5000 // Higher increment for premium feel
  );
  const [showSuccess, setShowSuccess] = useState(false);

  // 'Gyeol' Temperature (replaces Manner Temp)
  // Represents "Warmth of Story" or "Reliability"
  const mannerTemp = 36.5 + (item.sellerRating - 3.0) * 10;
  
  const handleBid = () => {
    if (isNoBids) {
        if (bidAmount < item.startingPrice) {
            alert(`소장품의 시작 가치는 ${item.startingPrice.toLocaleString()}원입니다.`);
            return;
        }
    } else {
        if (bidAmount <= item.currentPrice) {
            alert(`현재 인정받은 가치(${item.currentPrice.toLocaleString()}원)보다 높아야 합니다.`);
            return;
        }
    }
    
    onBid(item.id, bidAmount);
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
        onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-brand-50 z-50 flex flex-col h-full animate-in slide-in-from-right duration-500 font-sans">
      {/* Header - Transparent to White */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <button onClick={onClose} className="p-2 bg-black/10 backdrop-blur-sm rounded-full text-white hover:bg-black/20 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex gap-2">
            <button className="p-2 bg-black/10 backdrop-blur-sm rounded-full text-white hover:bg-black/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-48 no-scrollbar">
        {/* Hero Image */}
        <div className="relative h-[50vh] w-full">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-50 via-transparent to-transparent opacity-90"></div>
        </div>

        <div className="px-6 -mt-12 relative z-10">
            {/* Title Section */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 border border-brand-300 text-brand-600 text-[10px] tracking-widest uppercase">
                        {item.year ? `Since ${item.year}` : 'Vintage'}
                    </span>
                    <span className="text-brand-400 text-xs tracking-wider">{item.category}</span>
                </div>
                <h1 className="text-3xl font-serif font-medium text-brand-900 mb-2 leading-tight">{item.title}</h1>
                {item.subtitle && (
                    <p className="text-lg text-brand-600 font-serif italic opacity-80">"{item.subtitle}"</p>
                )}
            </div>

            {/* Custodian (Seller) Profile */}
            <div className="bg-white p-5 border border-brand-100 shadow-sm mb-8 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-200"></div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-100 overflow-hidden border border-brand-200">
                        {item.sellerAvatarUrl ? (
                            <img src={item.sellerAvatarUrl} alt={item.sellerName} className="w-full h-full object-cover" />
                        ) : null}
                    </div>
                    <div>
                        <p className="text-xs text-brand-400 uppercase tracking-widest mb-0.5">Current Custodian</p>
                        <h4 className="font-medium text-brand-900 text-lg font-serif">{item.sellerName}</h4>
                        <p className="text-xs text-gray-500 font-light">{item.location}</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-serif text-brand-500">{mannerTemp.toFixed(1)}°</span>
                    <span className="text-[10px] text-gray-400">마음의 온도</span>
                </div>
            </div>

            {/* Story (Description) */}
            <div className="mb-10">
                <h3 className="font-serif text-lg text-brand-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-brand-300"></span>
                    물건에 담긴 이야기
                </h3>
                <p className="text-brand-800 leading-8 font-light whitespace-pre-line text-justify">
                    {item.description}
                </p>
            </div>

            {/* History (Bids) */}
            <div className="mb-10">
                <h3 className="font-serif text-lg text-brand-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-brand-300"></span>
                    가치의 흐름
                </h3>
                <div className="space-y-4 border-l border-brand-200 ml-2 pl-6 relative">
                    {item.bids.length === 0 ? (
                        <p className="text-sm text-gray-400 italic font-serif">아직 발견되지 않은 가치입니다.</p>
                    ) : (
                        item.bids.slice().reverse().map((bid, index) => (
                            <div key={bid.id} className="relative">
                                <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-300 border-2 border-brand-50"></div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-medium text-brand-700">{bid.bidderName}</span>
                                    <span className="font-serif text-brand-900">{bid.amount.toLocaleString()}원</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                    {index === 0 ? '현재 가치를 인정함' : '가치를 알아봄'}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="border-t border-brand-200 p-5 bg-brand-50/95 backdrop-blur-md absolute bottom-0 w-full z-20 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-end mb-4">
             <span className="text-xs text-brand-400 uppercase tracking-widest font-medium">
               {isNoBids ? 'Starting Value' : 'Current Value'}
             </span>
             <span className="text-2xl font-serif text-brand-900">
               {isNoBids ? item.startingPrice.toLocaleString() : item.currentPrice.toLocaleString()}<span className="text-sm font-sans font-light ml-1">원</span>
             </span>
        </div>
        
        {isNoBids ? (
          <div className="flex flex-col gap-3">
             <div className="bg-white border border-brand-300 p-4 rounded-sm shadow-sm">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-dashed border-brand-100">
                    <label className="text-xs font-serif text-brand-800 font-bold flex items-center gap-1">
                        <svg className="w-3 h-3 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        첫 가치 제안
                    </label>
                    <span className="text-[10px] text-brand-400">최소 {item.startingPrice.toLocaleString()}원 부터</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 flex items-center">
                        <input 
                            type="number" 
                            value={bidAmount}
                            onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
                            className="w-full bg-transparent border-none font-serif text-xl text-brand-900 focus:ring-0 outline-none p-0 placeholder-brand-300"
                            placeholder={item.startingPrice.toString()}
                        />
                        <span className="text-sm text-brand-400 font-serif ml-2">WON</span>
                    </div>
                    <button 
                        onClick={handleBid}
                        disabled={bidAmount < item.startingPrice}
                        className={`px-6 py-2.5 bg-brand-800 text-brand-50 font-serif text-xs tracking-widest hover:bg-brand-900 transition-colors rounded-sm ${
                            bidAmount < item.startingPrice ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        경매 시작
                    </button>
                </div>
             </div>
             <p className="text-[10px] text-center text-brand-400 mt-1">
               * 첫 입찰은 판매자가 설정한 최소 시작가 이상이어야 합니다.
             </p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white border border-brand-200 p-3 flex items-center">
                <input 
                    type="number" 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent border-none font-serif text-xl text-brand-900 focus:ring-0 outline-none"
                />
                <span className="text-xs text-brand-400 font-light">WON</span>
            </div>
            <button 
                onClick={handleBid}
                className="px-8 py-4 bg-brand-800 text-brand-50 font-serif tracking-widest hover:bg-brand-900 transition-colors shadow-lg shadow-brand-900/10"
            >
                입찰하기
            </button>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccess && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-brand-900/30 backdrop-blur-sm">
              <div className="bg-white p-8 max-w-xs w-full text-center shadow-2xl border border-brand-100">
                <div className="mb-4 text-brand-600 flex justify-center">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-serif text-xl text-brand-900 mb-2">가치가 전달되었습니다</h3>
                <p className="text-sm text-brand-500 font-light leading-relaxed">
                    소장품에 대한 당신의 안목이<br/>기록되었습니다.
                </p>
              </div>
          </div>
      )}
    </div>
  );
};

export default AuctionDetail;