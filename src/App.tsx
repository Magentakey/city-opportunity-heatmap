import React, { useMemo } from 'react';
import { LocationData, CityMetrics } from './types';
import locationsDataRaw from './data/locations.json';
import cityMetricsRaw from './data/city_metrics.json';
import { calculateOpportunityScore } from './utils/opportunityEngine';
import { usePersistentState } from './hooks/usePersistentState';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MapOverlay } from './components/MapOverlay';
import { Dashboard } from './components/Dashboard';

const locationsData = locationsDataRaw as LocationData[];
const cityMetrics = cityMetricsRaw as CityMetrics;

const processedLocations = locationsData.map(loc => ({
  ...loc,
  opportunity_score: calculateOpportunityScore(loc)
}));

export default function App() {
  // Persistent State for filters and view
  const [selectedCategory, setSelectedCategory] = usePersistentState<string>("city-heatmap-category", "All Categories");
  const [searchQuery, setSearchQuery] = usePersistentState<string>("city-heatmap-search", "");
  const [minScore, setMinScore] = usePersistentState<number>("city-heatmap-min-score", 0);
  const [minVisits, setMinVisits] = usePersistentState<number>("city-heatmap-min-visits", 0);
  const [view, setView] = usePersistentState<'map' | 'dashboard'>('city-heatmap-view', 'map');

  const filteredLocations = useMemo(() => {
    return processedLocations.filter(loc => {
      const matchesCategory = selectedCategory === "All Categories" || loc.category === selectedCategory;
      const matchesSearch = loc.location_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesScore = (loc.opportunity_score || 0) >= minScore;
      const matchesVisits = loc.monthly_visits >= minVisits;
      return matchesCategory && matchesSearch && matchesScore && matchesVisits;
    }).sort((a, b) => (b.opportunity_score || 0) - (a.opportunity_score || 0));
  }, [selectedCategory, searchQuery, minScore, minVisits]);

  const topOpportunities = useMemo(() => {
    return [...filteredLocations].slice(0, 5);
  }, [filteredLocations]);

  const resetFilters = () => {
    setSelectedCategory("All Categories");
    setSearchQuery("");
    setMinScore(0);
    setMinVisits(0);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        view={view} 
        setView={setView} 
      />

      <main className="flex-1 flex overflow-hidden">
        <Sidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          minScore={minScore}
          setMinScore={setMinScore}
          minVisits={minVisits}
          setMinVisits={setMinVisits}
          topOpportunities={topOpportunities}
          resetFilters={resetFilters}
        />

        <div className="flex-1 relative">
          {view === 'map' ? (
            <MapOverlay filteredLocations={filteredLocations} />
          ) : (
            <Dashboard filteredLocations={filteredLocations} cityMetrics={cityMetrics} />
          )}
        </div>
      </main>
    </div>
  );
}
