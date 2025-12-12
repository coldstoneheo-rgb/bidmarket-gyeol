import React, { useState, useEffect } from 'react';
import { AuctionItem } from '../types';

interface AuctionCardProps {
  item: AuctionItem;
  onClick: (item: AuctionItem) => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ item, onClick }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = item.endTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('마감');
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 24) {
          const days = Math.floor(hours / 24);
          setTimeLeft(`${days}일 남음`);
      } else {
          setTimeLeft(`${hours}시간 ${minutes}분 남음`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item.endTime]);

  return (
    <div 
      onClick={() => onClick(item)}
      className="bg-white rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 mb-6 group border border-brand-100/50"
    >
      {/* Image Area - Aspect Ratio similar to a photo frame */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale-[10%] group-hover:grayscale-0"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-serif tracking-widest text-brand-900 border border-brand-200">
          {item.year ? `${item.year}` : 'VINTAGE'}
        </div>
        <div className="absolute bottom-3 right-3 bg-brand-900/80 text-white text-xs px-3 py-1 font-light tracking-wide backdrop-blur-sm">
          {timeLeft}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <div>
                <span className="text-xs text-brand-500 font-medium tracking-wider uppercase mb-1 block">{item.category}</span>
                <h3 className="font-serif text-xl text-gray-900 leading-tight mb-1 group-hover:text-brand-700 transition-colors">
                    {item.title}
                </h3>
            </div>
        </div>
        
        {item.subtitle && (
            <p className="text-sm text-gray-500 font-light mb-4 line-clamp-1 italic font-serif">
                "{item.subtitle}"
            </p>
        )}

        <div className="flex justify-between items-end border-t border-brand-100 pt-3 mt-2">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                {item.sellerAvatarUrl && <img src={item.sellerAvatarUrl} className="w-full h-full object-cover" />}
             </div>
             <span className="text-xs text-gray-500">{item.sellerName}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-light mb-0.5">현재 가치</span>
            <span className="font-serif text-lg font-medium text-brand-800">
              {item.currentPrice.toLocaleString()} <span className="text-xs font-sans">원</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;