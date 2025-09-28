'use client';

import { useState, useEffect } from 'react';
import { MapPin, Zap, Wifi, HardDrive, Radio } from 'lucide-react';
import { DePINNode } from '@/lib/types';
import { mockNodes } from '@/lib/mockData';
import { getHealthColor, formatDistance, calculateDistance } from '@/lib/utils';
import { NodeCard } from './NodeCard';

interface MapCanvasProps {
  variant?: 'interactive';
  onNodeSelect?: (node: DePINNode) => void;
}

export function MapCanvas({ variant = 'interactive', onNodeSelect }: MapCanvasProps) {
  const [nodes, setNodes] = useState<DePINNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<DePINNode | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Use default San Francisco location
        }
      );
    }

    // Load nodes (in real app, this would be an API call)
    setNodes(mockNodes);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'wifi': return Wifi;
      case 'storage': return HardDrive;
      case 'compute': return Zap;
      case 'sensor': return Radio;
      default: return MapPin;
    }
  };

  const handleNodeClick = (node: DePINNode) => {
    setSelectedNode(node);
    onNodeSelect?.(node);
  };

  const getNodeDistance = (node: DePINNode) => {
    if (!userLocation) return null;
    return calculateDistance(
      userLocation.lat,
      userLocation.lng,
      node.latitude,
      node.longitude
    );
  };

  return (
    <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
        {/* Grid overlay for map-like appearance */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-gray-600 border-opacity-30" />
            ))}
          </div>
        </div>
        
        {/* Street names overlay */}
        <div className="absolute inset-0 text-xs text-gray-400 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 rotate-12">Mission St</div>
          <div className="absolute top-1/2 left-1/3 -rotate-6">Market St</div>
          <div className="absolute top-3/4 left-1/2 rotate-3">Valencia St</div>
          <div className="absolute top-1/3 right-1/4 -rotate-12">Castro St</div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={() => setZoom(Math.min(zoom + 1, 18))}
          className="w-10 h-10 bg-surface border border-gray-600 rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg font-bold">+</span>
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 1, 8))}
          className="w-10 h-10 bg-surface border border-gray-600 rounded-md flex items-center justify-center hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg font-bold">−</span>
        </button>
      </div>

      {/* User Location */}
      {userLocation && (
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-20"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" />
        </div>
      )}

      {/* DePIN Nodes */}
      {nodes.map((node, index) => {
        const Icon = getNodeIcon(node.type);
        const distance = getNodeDistance(node);
        
        // Calculate position based on distance from center
        const offsetX = (node.longitude - mapCenter.lng) * 1000 + Math.random() * 100 - 50;
        const offsetY = (mapCenter.lat - node.latitude) * 1000 + Math.random() * 100 - 50;
        
        return (
          <button
            key={node.nodeId}
            onClick={() => handleNodeClick(node)}
            className="absolute z-30 group"
            style={{
              left: `${50 + offsetX}%`,
              top: `${50 + offsetY}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`relative w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 group-hover:scale-110 ${
              node.status === 'active' ? 'bg-accent animate-pulse-slow' : 
              node.status === 'maintenance' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}>
              <Icon className="w-4 h-4 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Node info tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-surface border border-gray-600 rounded-lg p-2 text-xs whitespace-nowrap shadow-lg">
                <div className="font-medium">{node.type.toUpperCase()} Node</div>
                <div className={getHealthColor(node.healthScore)}>
                  Health: {node.healthScore}%
                </div>
                {distance && (
                  <div className="text-text-secondary">
                    {formatDistance(distance)}
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 z-40">
          <NodeCard
            node={selectedNode}
            variant="detailed"
            onClose={() => setSelectedNode(null)}
            distance={getNodeDistance(selectedNode)}
          />
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 bg-surface border border-gray-600 rounded-lg p-3 text-xs">
        <div className="font-medium mb-2">Node Types</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Wifi className="w-3 h-3 text-accent" />
            <span>WiFi Hotspot</span>
          </div>
          <div className="flex items-center space-x-2">
            <HardDrive className="w-3 h-3 text-accent" />
            <span>Storage</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-3 h-3 text-accent" />
            <span>Compute</span>
          </div>
          <div className="flex items-center space-x-2">
            <Radio className="w-3 h-3 text-accent" />
            <span>Sensor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
