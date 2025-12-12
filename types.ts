export interface Bid {
  id: string;
  bidderName: string;
  amount: number;
  timestamp: Date;
}

export interface AuctionItem {
  id: string;
  title: string;
  subtitle?: string; // Short emotional tagline
  description: string;
  category: string;
  imageUrl: string;
  startingPrice: number;
  currentPrice: number;
  endTime: Date;
  sellerName: string;
  sellerAvatarUrl?: string;
  sellerRating: number;
  bids: Bid[];
  location: string;
  year?: number; // Year of acquisition or production
}

export enum NavTab {
  HOME = 'home',
  SEARCH = 'search',
  POST = 'post',
  CHAT = 'chat',
  MY_BID = 'my_bid',
  AI_PLANNER = 'ai_planner'
}

export interface PlannerMessage {
  role: 'user' | 'model';
  content: string;
  type: 'text' | 'markdown';
}