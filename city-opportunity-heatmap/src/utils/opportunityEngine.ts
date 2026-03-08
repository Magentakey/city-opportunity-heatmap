import { LocationData } from '../types';

export const calculateOpportunityScore = (loc: LocationData): number => {
  // Formula: (Visits Weight * 0.4) + (Low Competition Weight * 0.4) + (Daytime Pop Weight * 0.2)
  const visitScore = Math.min((loc.monthly_visits / 150000) * 100, 100);
  const competitionScore = Math.max(100 - (loc.competition_count * 10), 0);
  const popScore = Math.min((loc.daytime_pop / 70000) * 100, 100);
  
  return Math.round((visitScore * 0.4) + (competitionScore * 0.4) + (popScore * 0.2));
};

export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
  if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-100';
  if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-100';
  return 'text-rose-600 bg-rose-50 border-rose-100';
};

export const getMarkerColor = (score: number) => {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
};
