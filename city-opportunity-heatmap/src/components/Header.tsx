import React from 'react';
import { TrendingUp, Search, Map as MapIcon, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  view: 'map' | 'dashboard';
  setView: (v: 'map' | 'dashboard') => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, view, setView }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-slate-900 p-2 rounded-lg">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">City Opportunity Heatmap</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Montgomery Economic Insights</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search locations..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setView('map')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'map' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MapIcon className="w-4 h-4" /> Map
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'dashboard' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
        </div>
      </div>
    </header>
  );
};
