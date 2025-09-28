'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { MapCanvas } from './components/MapCanvas';
import { DashboardMetric } from './components/DashboardMetric';
import { AlertBanner } from './components/AlertBanner';
import { TabbedNavigation } from './components/TabbedNavigation';
import { NodeCard } from './components/NodeCard';
import { DePINNode, EarningOpportunity } from '@/lib/types';
import { mockNodes, mockOpportunities, mockEarnings } from '@/lib/mockData';
import { formatCurrency, isOpportunityActive, sortNodesByProximity } from '@/lib/utils';
import { Coins, Zap, MapPin, Bell, TrendingUp, Clock } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('map');
  const [nodes, setNodes] = useState<DePINNode[]>([]);
  const [opportunities, setOpportunities] = useState<EarningOpportunity[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedNode, setSelectedNode] = useState<DePINNode | null>(null);

  useEffect(() => {
    // Initialize data
    setNodes(mockNodes);
    setOpportunities(mockOpportunities);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
        }
      );
    }
  }, []);

  const activeOpportunities = opportunities.filter(isOpportunityActive);
  const nearbyNodes = userLocation 
    ? sortNodesByProximity(nodes, userLocation.lat, userLocation.lng).slice(0, 5)
    : nodes.slice(0, 5);

  const totalEarnings = mockEarnings.reduce((sum, earning) => sum + earning.amount, 0);
  const activeNodes = nodes.filter(node => node.status === 'active').length;

  const renderMapView = () => (
    <div className="h-full p-4">
      <div className="h-full">
        <MapCanvas
          variant="interactive"
          onNodeSelect={setSelectedNode}
        />
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardMetric
          title="Total Earnings"
          value={formatCurrency(totalEarnings * 45.2)} // Mock USD conversion
          change={{ value: "+12.5%", trend: "up" }}
          icon={<Coins className="w-6 h-6" />}
        />
        <DashboardMetric
          title="Active Nodes"
          value={activeNodes.toString()}
          change={{ value: "+2", trend: "up" }}
          icon={<Zap className="w-6 h-6" />}
        />
        <DashboardMetric
          title="Avg Health Score"
          value="87%"
          change={{ value: "+3%", trend: "up" }}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <DashboardMetric
          title="Opportunities"
          value={activeOpportunities.length.toString()}
          icon={<Bell className="w-6 h-6" />}
        />
      </div>

      {/* Active Opportunities */}
      {activeOpportunities.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Opportunities</h2>
          <div className="space-y-3">
            {activeOpportunities.map((opportunity) => {
              const node = nodes.find(n => n.nodeId === opportunity.nodeId);
              return (
                <AlertBanner
                  key={opportunity.opportunityId}
                  variant="success"
                  title={`${opportunity.rewardMultiplier}x Rewards Available!`}
                  message={`${opportunity.description} ${node ? `at ${node.type} node` : ''}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Nearby Nodes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Nearby Nodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyNodes.map((node) => (
            <NodeCard
              key={node.nodeId}
              node={node}
              variant="compact"
            />
          ))}
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Today's Earnings</h2>
        <div className="glass-card p-4 rounded-lg">
          <div className="space-y-3">
            {mockEarnings.map((earning) => (
              <div key={earning.reportId} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-black">
                      {earning.currency.slice(0, 2)}
                    </span>
                  </div>
                  <span className="font-medium">{earning.currency}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{earning.amount.toFixed(2)}</div>
                  <div className="text-xs text-text-secondary">
                    ≈ {formatCurrency(earning.amount * 45.2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Alerts & Notifications</h1>
      </div>

      <TabbedNavigation
        tabs={[
          { id: 'active', label: 'Active', count: activeOpportunities.length },
          { id: 'history', label: 'History', count: 12 },
          { id: 'settings', label: 'Settings' }
        ]}
        activeTab="active"
        onTabChange={() => {}}
      />

      <div className="space-y-4">
        {activeOpportunities.length > 0 ? (
          activeOpportunities.map((opportunity) => {
            const node = nodes.find(n => n.nodeId === opportunity.nodeId);
            return (
              <div key={opportunity.opportunityId} className="glass-card p-4 rounded-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {opportunity.rewardMultiplier}x Reward Multiplier
                    </h3>
                    <p className="text-text-secondary mb-2">{opportunity.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      {node && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{node.type.toUpperCase()} Node</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Ends in 2h 15m</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary text-sm px-4 py-2">
                    View Node
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Alerts</h3>
            <p className="text-text-secondary">
              We'll notify you when new earning opportunities become available.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="glass-card p-6 rounded-lg">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-black">U</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">DePIN Explorer</h2>
            <p className="text-text-secondary">Premium Member</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{activeNodes}</div>
            <div className="text-sm text-text-secondary">Monitored Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(totalEarnings * 45.2)}
            </div>
            <div className="text-sm text-text-secondary">Total Earnings</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span>High-yield opportunities</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span>New nodes in area</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span>Health score alerts</span>
              <input type="checkbox" className="rounded" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return renderMapView();
      case 'dashboard':
        return renderDashboard();
      case 'alerts':
        return renderAlerts();
      case 'profile':
        return renderProfile();
      default:
        return renderMapView();
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppShell>
  );
}
