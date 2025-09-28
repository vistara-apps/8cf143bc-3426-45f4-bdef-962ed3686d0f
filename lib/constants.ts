import { Protocol } from './types';

export const PROTOCOLS: Protocol[] = [
  {
    protocolId: 'helium',
    name: 'Helium',
    iconUrl: '/icons/helium.svg',
    color: '#00D4AA'
  },
  {
    protocolId: 'hivemapper',
    name: 'Hivemapper',
    iconUrl: '/icons/hivemapper.svg',
    color: '#FFD700'
  },
  {
    protocolId: 'render',
    name: 'Render',
    iconUrl: '/icons/render.svg',
    color: '#FF6B35'
  },
  {
    protocolId: 'filecoin',
    name: 'Filecoin',
    iconUrl: '/icons/filecoin.svg',
    color: '#0090FF'
  }
];

export const NODE_TYPES = {
  wifi: { label: 'WiFi Hotspot', icon: '📶' },
  storage: { label: 'Storage Node', icon: '💾' },
  compute: { label: 'Compute Node', icon: '⚡' },
  sensor: { label: 'Sensor Node', icon: '📡' }
};

export const HEALTH_THRESHOLDS = {
  excellent: 90,
  good: 70,
  poor: 50
};

export const DEFAULT_MAP_CENTER = {
  latitude: 37.7749,
  longitude: -122.4194
};

export const MAP_ZOOM_LEVELS = {
  city: 12,
  neighborhood: 15,
  street: 18
};
