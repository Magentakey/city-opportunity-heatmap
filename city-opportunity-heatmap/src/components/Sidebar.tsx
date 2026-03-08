import React from 'react';
import { Filter, RefreshCcw, MapPin, TrendingUp, Info } from 'lucide-react';
import { CATEGORIES, LocationData } from '../types';
import { getScoreColor } from '../utils/opportunityEngine';

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  minScore: number;
  setMinScore: (s: number) => void;
  minVisits: number;
  setMinVisits: (v: number) => void;
  topOpportunities: LocationData[];
  resetFilters: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  minScore,
  setMinScore,
  minVisits,
  setMinVisits,
  topOpportunities,
  resetFilters
}) => {
  return (
    <aside className="w-96 bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      <div className="p-6 border-b border-slate-100 space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Filter by Category</label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none focus:ring-2 focus:ring-slate-200 outline-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Min Opportunity Score</label>
              <span className="text-xs font-bold text-slate-900">{minScore}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Min Monthly Visits</label>
              <span className="text-xs font-bold text-slate-900">{(minVisits / 1000).toFixed(0)}k</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="150000" 
              step="5000"
              value={minVisits}
              onChange={(e) => setMinVisits(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
            />
          </div>
        </div>

        <button 
          onClick={resetFilters}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <RefreshCcw className="w-3 h-3" /> Reset Filters
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Top Opportunities</h2>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">LIVE DATA</span>
          </div>
          <div className="space-y-3">
            {topOpportunities.map((loc, idx) => (
              <div key={loc.id} className="group p-4 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">0{idx + 1}</span>
                    <h3 className="font-bold text-slate-900 leading-tight">{loc.location_name}</h3>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-lg border ${getScoreColor(loc.opportunity_score || 0)}`}>
                    {loc.opportunity_score}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {loc.category}</span>
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {loc.monthly_visits.toLocaleString()} visits</span>
                </div>
              </div>
            ))}
            {topOpportunities.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm text-slate-400 italic">No locations match your filters.</p>
              </div>
            )}
          </div>
        </section>

        <section className="pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-4">City Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Total Visitors</p>
              <p className="text-xl font-black text-blue-900">1.2M</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Avg. Score</p>
              <p className="text-xl font-black text-emerald-900">68</p>
            </div>
          </div>
        </section>
      </div>

      <div className="p-4 bg-slate-900 text-white flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg">
          <Info className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="text-[10px] leading-relaxed opacity-80">
          Opportunity score is calculated based on traffic density, competitive saturation, and daytime population.
        </p>
      </div>
    </aside>
  );
};
