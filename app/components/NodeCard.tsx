'use client';

import { X, MapPin, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { DePINNode } from '@/lib/types';
import { getHealthColor, formatDistance, formatTimeAgo } from '@/lib/utils';
import { PROTOCOLS, NODE_TYPES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface NodeCardProps {
  node: DePINNode;
  variant?: 'compact' | 'detailed';
  onClose?: () => void;
  distance?: number | null;
  className?: string;
}

export function NodeCard({ 
  node, 
  variant = 'compact', 
  onClose, 
  distance,
  className 
}: NodeCardProps) {
  const protocol = PROTOCOLS.find(p => p.protocolId === node.protocolId);
  const nodeType = NODE_TYPES[node.type];
  const healthColor = getHealthColor(node.healthScore);

  if (variant === 'compact') {
    return (
      <div className={cn("glass-card p-4 rounded-lg", className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{nodeType.icon}</span>
              <span className="font-medium">{nodeType.label}</span>
              <div className={cn(
                "w-2 h-2 rounded-full",
                node.status === 'active' ? 'bg-green-400' :
                node.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
              )} />
            </div>
            
            <div className="text-sm text-text-secondary space-y-1">
              <div className="flex items-center space-x-2">
                <span>Health:</span>
                <span className={healthColor}>{node.healthScore}%</span>
              </div>
              {distance && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>{formatDistance(distance)}</span>
                </div>
              )}
            </div>
          </div>
          
          {protocol && (
            <div className="text-xs text-text-secondary">
              {protocol.name}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("glass-card rounded-lg shadow-overlay", className)}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{nodeType.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{nodeType.label}</h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                {protocol && <span>{protocol.name}</span>}
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  node.status === 'active' ? 'bg-green-400' :
                  node.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                )} />
                <span className="capitalize">{node.status}</span>
              </div>
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className={cn("text-2xl font-bold", healthColor)}>
              {node.healthScore}%
            </div>
            <div className="text-xs text-text-secondary">Health Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {node.uptime}%
            </div>
            <div className="text-xs text-text-secondary">Uptime</div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Reward Rate</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="font-medium">{node.rewardRate} tokens/hour</span>
            </div>
          </div>
          
          {distance && (
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Distance</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{formatDistance(distance)}</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Last Updated</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(node.lastUpdated)}</span>
            </div>
          </div>
        </div>

        {/* Status Alert */}
        {node.status === 'maintenance' && (
          <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg">
            <div className="flex items-center space-x-2 text-yellow-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Node under maintenance</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button className="w-full mt-4 btn-primary">
          Monitor Node
        </button>
      </div>
    </div>
  );
}
