'use client';

import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { DashboardMetric } from '../components/DashboardMetric';
import { AlertBanner } from '../components/AlertBanner';
import { NodeCard } from '../components/NodeCard';
import { mockNodes } from '@/lib/mockData';
import { Coins, Zap, MapPin, Palette } from 'lucide-react';

const themes = [
  { id: 'default', name: 'Professional Finance', description: 'Dark navy with gold accents' },
  { id: 'celo', name: 'Celo', description: 'Black with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
];

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme as any);
    setTheme(newTheme as any);
  };

  return (
    <div className="min-h-screen bg-bg text-fg p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Palette className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold">Theme Preview</h1>
          </div>
          <p className="text-text-secondary">
            Preview different themes for the DePIN Navigator app
          </p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => handleThemeChange(themeOption.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedTheme === themeOption.id
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <h3 className="font-medium">{themeOption.name}</h3>
                <p className="text-sm text-text-secondary mt-1">
                  {themeOption.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-8">
          {/* Metrics */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardMetric
                title="Total Earnings"
                value="$1,234.56"
                change={{ value: "+12.5%", trend: "up" }}
                icon={<Coins className="w-6 h-6" />}
              />
              <DashboardMetric
                title="Active Nodes"
                value="8"
                change={{ value: "+2", trend: "up" }}
                icon={<Zap className="w-6 h-6" />}
              />
              <DashboardMetric
                title="Health Score"
                value="87%"
                change={{ value: "+3%", trend: "up" }}
                icon={<MapPin className="w-6 h-6" />}
              />
              <DashboardMetric
                title="Opportunities"
                value="3"
                icon={<Zap className="w-6 h-6" />}
              />
            </div>
          </div>

          {/* Alerts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Alert Banners</h2>
            <div className="space-y-4">
              <AlertBanner
                variant="success"
                title="High Reward Opportunity"
                message="2.5x rewards available at nearby WiFi node for the next 2 hours!"
              />
              <AlertBanner
                variant="warning"
                title="Node Maintenance"
                message="Your monitored storage node will undergo maintenance in 30 minutes."
              />
              <AlertBanner
                variant="info"
                title="New Feature Available"
                message="Cross-network analytics are now available in your dashboard."
              />
            </div>
          </div>

          {/* Node Cards */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Node Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NodeCard
                node={mockNodes[0]}
                variant="compact"
                distance={250}
              />
              <NodeCard
                node={mockNodes[1]}
                variant="compact"
                distance={450}
              />
            </div>
          </div>

          {/* Buttons */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="glass-card px-4 py-2 rounded-lg hover:bg-opacity-15 transition-all duration-200">
                Glass Button
              </button>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Typography</h2>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Heading 1</h1>
              <h2 className="text-2xl font-semibold">Heading 2</h2>
              <h3 className="text-xl font-medium">Heading 3</h3>
              <p className="text-base">Body text with normal weight</p>
              <p className="text-sm text-text-secondary">Secondary text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
