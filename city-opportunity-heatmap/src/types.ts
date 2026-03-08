export interface LocationData {
  id: number;
  location_name: string;
  category: string;
  monthly_visits: number;
  latitude: number;
  longitude: number;
  competition_count: number;
  daytime_pop: number;
  opportunity_score?: number;
}

export interface CityMetrics {
  city_name: string;
  total_visitors: number;
  avg_opportunity_score: number;
  category_distribution: Record<string, number>;
  visitor_trends: { month: string; visits: number }[];
}

export const CATEGORIES = [
  "All Categories",
  "Dining",
  "Groceries",
  "Apparel",
  "Shopping Centers",
  "Medical & Health",
  "Leisure",
  "Gas Stations"
];
