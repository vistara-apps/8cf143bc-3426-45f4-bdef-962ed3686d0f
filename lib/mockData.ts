import { DePINNode, EarningOpportunity, EarningsReport } from './types';

// Mock data for development - replace with real API calls
export const mockNodes: DePINNode[] = [
  {
    nodeId: 'node-1',
    type: 'wifi',
    latitude: 37.7849,
    longitude: -122.4094,
    status: 'active',
    healthScore: 95,
    lastUpdated: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
    protocolId: 'helium',
    rewardRate: 0.25,
    uptime: 99.8
  },
  {
    nodeId: 'node-2',
    type: 'storage',
    latitude: 37.7649,
    longitude: -122.4194,
    status: 'active',
    healthScore: 87,
    lastUpdated: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
    protocolId: 'filecoin',
    rewardRate: 0.18,
    uptime: 98.5
  },
  {
    nodeId: 'node-3',
    type: 'compute',
    latitude: 37.7749,
    longitude: -122.4294,
    status: 'active',
    healthScore: 92,
    lastUpdated: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago
    protocolId: 'render',
    rewardRate: 0.32,
    uptime: 99.2
  },
  {
    nodeId: 'node-4',
    type: 'sensor',
    latitude: 37.7549,
    longitude: -122.4394,
    status: 'maintenance',
    healthScore: 45,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    protocolId: 'hivemapper',
    rewardRate: 0.12,
    uptime: 85.3
  },
  {
    nodeId: 'node-5',
    type: 'wifi',
    latitude: 37.7949,
    longitude: -122.3994,
    status: 'active',
    healthScore: 78,
    lastUpdated: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
    protocolId: 'helium',
    rewardRate: 0.21,
    uptime: 96.7
  }
];

export const mockOpportunities: EarningOpportunity[] = [
  {
    opportunityId: 'opp-1',
    nodeId: 'node-1',
    protocolId: 'helium',
    startTime: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    rewardMultiplier: 2.5,
    type: 'surge',
    description: 'High demand period - 2.5x rewards!'
  },
  {
    opportunityId: 'opp-2',
    nodeId: 'node-3',
    protocolId: 'render',
    startTime: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
    endTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
    rewardMultiplier: 1.8,
    type: 'bonus',
    description: 'Weekend bonus event starting soon!'
  }
];

export const mockEarnings: EarningsReport[] = [
  {
    reportId: 'earn-1',
    userId: 'user-1',
    protocolId: 'helium',
    date: new Date().toISOString().split('T')[0],
    amount: 12.45,
    currency: 'HNT'
  },
  {
    reportId: 'earn-2',
    userId: 'user-1',
    protocolId: 'filecoin',
    date: new Date().toISOString().split('T')[0],
    amount: 8.32,
    currency: 'FIL'
  },
  {
    reportId: 'earn-3',
    userId: 'user-1',
    protocolId: 'render',
    date: new Date().toISOString().split('T')[0],
    amount: 15.67,
    currency: 'RNDR'
  }
];
