import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { ChevronRight } from 'lucide-react';
import { LocationData } from '../types';
import { getMarkerColor, getScoreColor } from '../utils/opportunityEngine';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

interface MapOverlayProps {
  filteredLocations: LocationData[];
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export const MapOverlay: React.FC<MapOverlayProps> = ({ filteredLocations }) => {
  // Using CartoDB Dark Matter for a professional "Dark Mode" aesthetic
  const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const lightTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className="absolute inset-0 p-4">
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
        <MapContainer 
          center={[32.3668, -86.3000]} 
          zoom={12} 
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={darkTiles}
          />
          <ChangeView center={[32.3668, -86.3000]} zoom={12} />
          
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            showCoverageOnHover={false}
          >
            {filteredLocations.map(loc => (
              <CircleMarker 
                key={loc.id}
                center={[loc.latitude, loc.longitude]}
                radius={Math.max(loc.monthly_visits / 8000, 8)}
                fillColor={getMarkerColor(loc.opportunity_score || 0)}
                color="#fff"
                weight={2}
                opacity={1}
                fillOpacity={0.7}
              >
                <Popup className="custom-popup">
                  <div className="p-1 min-w-[200px]">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900">{loc.location_name}</h4>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getScoreColor(loc.opportunity_score || 0)}`}>
                        {loc.opportunity_score}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Category</span>
                        <span className="font-semibold">{loc.category}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Monthly Visits</span>
                        <span className="font-semibold">{loc.monthly_visits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Competition</span>
                        <span className="font-semibold">{loc.competition_count} nearby</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1">
                      View Detailed Analysis <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>

        {/* Map Legend */}
        <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Opportunity Index</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-[11px] font-medium text-slate-700">High (80-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-[11px] font-medium text-slate-700">Moderate (60-79)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-[11px] font-medium text-slate-700">Low (40-59)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <span className="text-[11px] font-medium text-slate-700">Saturated (&lt;40)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
