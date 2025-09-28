export interface User {
  userId: string;
  telegramId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  notificationPreferences: {
    highYieldAlerts: boolean;
    newNodeAlerts: boolean;
    healthAlerts: boolean;
  };
  premiumStatus: boolean;
}

export interface DePINNode {
  nodeId: string;
  type: 'wifi' | 'storage' | 'compute' | 'sensor';
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  healthScore: number; // 0-100
  lastUpdated: string;
  protocolId: string;
  rewardRate: number;
  uptime: number;
}

export interface Protocol {
  protocolId: string;
  name: string;
  iconUrl: string;
  color: string;
}

export interface EarningOpportunity {
  opportunityId: string;
  nodeId: string;
  protocolId: string;
  startTime: string;
  endTime: string;
  rewardMultiplier: number;
  type: 'bonus' | 'surge' | 'event';
  description: string;
}

export interface NodeInterest {
  userId: string;
  nodeId: string;
  interestLevel: 'low' | 'medium' | 'high';
}

export interface EarningsReport {
  reportId: string;
  userId: string;
  protocolId: string;
  date: string;
  amount: number;
  currency: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
