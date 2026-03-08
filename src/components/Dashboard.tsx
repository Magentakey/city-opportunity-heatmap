import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { LocationData, CityMetrics } from '../types';
import { getScoreColor } from '../utils/opportunityEngine';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface DashboardProps {
  filteredLocations: LocationData[];
  cityMetrics: CityMetrics;
}

export const Dashboard: React.FC<DashboardProps> = ({ filteredLocations, cityMetrics }) => {
  const chartData = {
    labels: Object.keys(cityMetrics.category_distribution),
    datasets: [
      {
        label: 'Category Popularity (%)',
        data: Object.values(cityMetrics.category_distribution),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="absolute inset-0 overflow-y-auto p-8 bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 col-span-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-6">Category Distribution</h3>
            <div key="bar-chart-wrapper" className="h-64 flex items-center justify-center">
              <Bar 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { beginAtZero: true, grid: { display: false } },
                    x: { grid: { display: false } }
                  }
                }} 
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-6">Market Share</h3>
            <div key="pie-chart-wrapper" className="h-64 flex items-center justify-center">
              <Pie 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-6">Full Opportunity Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Visits</th>
                  <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Competition</th>
                  <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredLocations.map(loc => (
                  <tr key={loc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-900 text-sm">{loc.location_name}</td>
                    <td className="py-4 text-slate-500 text-sm">{loc.category}</td>
                    <td className="py-4 text-slate-900 text-sm font-medium">{loc.monthly_visits.toLocaleString()}</td>
                    <td className="py-4 text-slate-500 text-sm">{loc.competition_count} units</td>
                    <td className="py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${getScoreColor(loc.opportunity_score || 0)}`}>
                        {loc.opportunity_score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
