'use client';

import { useState, useEffect } from 'react';
import type { TripCalculation, HotelChain, TravelConfig } from '@/types';
import { calculateAllTrips } from '@/services/trip';
import { DEFAULT_ORIGIN } from '@/services/origin';
import { getScoreColor } from '@/services/scoring';
import { Header } from '@/components/Header';

export default function MapPage() {
  const [trips, setTrips] = useState<TripCalculation[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [selectedResort, setSelectedResort] = useState<TripCalculation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);

  const [config, setConfig] = useState<TravelConfig>({
    origin: DEFAULT_ORIGIN,
    startDate: new Date('2026-03-15'),
    endDate: new Date('2026-03-22'),
    adults: 2,
    rooms: 1,
    budget: {
      maxTotal: 8500,
      currency: 'AUD',
    },
  });

  const [filters] = useState({
    hotel: {
      starRating: [5, 4] as (3|4|5)[],
      chains: [] as HotelChain[],
      amenities: {
        skiInSkiOut: true,
        breakfastIncluded: false,
        pool: false,
        spa: false,
        gym: false,
        freeParking: false,
      },
    },
  });

  useEffect(() => {
    setIsLoading(true);
    const calculatedTrips = calculateAllTrips(config, filters.hotel);
    setTrips(calculatedTrips);
    if (calculatedTrips.length > 0) {
      setSelectedResort(calculatedTrips[0]);
    }
    setIsLoading(false);
  }, [config, filters]);

  const handleViewModeChange = (mode: 'list' | 'map') => {
    setViewMode(mode);
    if (mode === 'list') {
      window.location.href = '/';
    }
  };

  const handleConfigChange = (newConfig: TravelConfig) => {
    setConfig(newConfig);
  };

  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      <Header
        origin={config.origin}
        config={config}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onConfigChange={handleConfigChange}
      />

      <main className="relative h-[calc(100vh-52px)] overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse text-gray-400">Loading map...</div>
          </div>
        ) : (
          <>
            <svg 
              className="absolute inset-0 w-full h-full transition-transform duration-300" 
              viewBox="0 0 1440 820" 
              preserveAspectRatio="xMidYMid slice"
              style={{ transform: `scale(${zoom})` }}
            >
              <g fill="#d0d0d0" stroke="#c0c0c0" strokeWidth="0.5">
                <path d="M50,150 Q150,100 250,120 Q350,80 450,100 Q500,150 480,200 Q450,250 400,280 Q350,300 300,320 Q250,350 200,380 Q150,400 100,380 Q50,350 50,300 Q30,250 50,200 Z" />
                <path d="M220,420 Q280,400 320,430 Q360,480 340,550 Q320,620 300,680 Q280,720 260,750 Q240,720 230,680 Q220,620 210,550 Q200,480 220,420 Z" />
                <path d="M550,100 Q650,80 750,90 Q850,70 950,80 Q1050,70 1150,90 Q1250,80 1350,100 Q1380,150 1360,200 Q1340,250 1300,280 Q1250,300 1200,320 Q1150,340 1100,330 Q1050,350 1000,340 Q950,360 900,350 Q850,370 800,360 Q750,380 700,370 Q650,390 600,380 Q580,350 570,300 Q560,250 560,200 Q550,150 550,100 Z" />
                <path d="M550,400 Q620,380 680,400 Q750,420 780,480 Q800,550 780,620 Q760,680 720,720 Q680,760 630,750 Q580,730 550,680 Q520,620 530,550 Q540,480 550,400 Z" />
                <path d="M1050,550 Q1150,530 1250,550 Q1320,580 1340,640 Q1350,700 1300,740 Q1250,780 1180,770 Q1110,760 1060,720 Q1010,680 1020,620 Q1030,570 1050,550 Z" />
                <path d="M1180,280 Q1220,270 1240,290 Q1260,310 1250,330 Q1230,340 1210,330 Q1190,320 1180,300 Q1170,290 1180,280 Z" />
                <path d="M1220,720 Q1250,710 1270,730 Q1280,760 1260,780 Q1240,790 1220,780 Q1200,770 1210,740 Q1220,720 1220,720 Z" />
              </g>
            </svg>

            {trips.map((trip) => {
              const pos = getPosition(trip.resort.coordinates.lat, trip.resort.coordinates.lng);
              const color = getScoreColor(trip.score.overall);
              return (
                <button
                  key={trip.resort.id}
                  onClick={() => setSelectedResort(trip)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 z-10"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg border-2 border-white"
                    style={{ backgroundColor: color }}
                  >
                    {trip.score.overall}
                  </div>
                  <div className="absolute top-11 left-1/2 transform -translate-x-1/2 bg-white px-2.5 py-1 rounded text-xs font-medium text-black whitespace-nowrap shadow-md">
                    {trip.resort.name}
                  </div>
                </button>
              );
            })}

            <div className="absolute left-5 top-5 w-44 bg-white rounded-xl p-4 shadow-lg hidden sm:block">
              <div className="text-xs font-semibold text-black mb-3 uppercase tracking-wide">Score</div>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                  <span className="text-xs text-gray-500">90-100 Excellent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#84cc16]"></div>
                  <span className="text-xs text-gray-500">70-89 Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div>
                  <span className="text-xs text-gray-500">50-69 Fair</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-black mb-3 uppercase tracking-wide">Components</div>
              <div className="flex flex-col gap-1.5">
                {['Travel', 'Timezone', 'Snow', 'Hotels', 'Busy'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className="text-[10px] text-gray-400 w-12">{item}</span>
                    <div className="flex-1 h-0.5 bg-gray-200 rounded">
                      <div className="h-full bg-[#22c55e] rounded" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedResort && (
              <div className="absolute right-5 top-5 w-60 bg-white rounded-xl p-5 shadow-lg max-h-[calc(100vh-100px)] overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-base font-semibold text-black">{selectedResort.resort.name}</div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: getScoreColor(selectedResort.score.overall) }}
                  >
                    {selectedResort.score.overall}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  {selectedResort.resort.region}, {selectedResort.resort.country}
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="bg-gray-50 p-2.5 rounded-md">
                    <div className="text-[9px] text-gray-400 uppercase mb-0.5">Travel</div>
                    <div className="text-sm font-semibold text-black">{Math.round(selectedResort.totalTravelTime)}h</div>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-md">
                    <div className="text-[9px] text-gray-400 uppercase mb-0.5">Snow</div>
                    <div className="text-sm font-semibold text-black">{selectedResort.resort.snow.baseDepth}cm</div>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-md">
                    <div className="text-[9px] text-gray-400 uppercase mb-0.5">Temp</div>
                    <div className="text-sm font-semibold text-black">{selectedResort.resort.snow.temperature}°C</div>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-md">
                    <div className="text-[9px] text-gray-400 uppercase mb-0.5">Crowds</div>
                    <div className="text-sm font-semibold text-black capitalize">{selectedResort.resort.busyLevel}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">7-day total</span>
                    <span className="text-base font-semibold text-black">${selectedResort.cost.total.toLocaleString()}</span>
                  </div>
                  <div className={`text-xs ${selectedResort.cost.underBudget >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${Math.abs(selectedResort.cost.underBudget).toLocaleString()} {selectedResort.cost.underBudget >= 0 ? 'under' : 'over'} budget
                  </div>
                </div>

                <button className="w-full py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  View Details
                </button>
              </div>
            )}

            <div className="absolute right-5 bottom-5 flex flex-col gap-1.5">
              <button 
                onClick={() => setZoom(z => Math.min(z * 1.2, 3))}
                className="w-9 h-9 bg-white rounded-md flex items-center justify-center shadow-md text-lg text-black hover:bg-gray-50"
              >
                +
              </button>
              <button 
                onClick={() => setZoom(z => Math.max(z / 1.2, 0.5))}
                className="w-9 h-9 bg-white rounded-md flex items-center justify-center shadow-md text-lg text-black hover:bg-gray-50"
              >
                &#8722;
              </button>
            </div>

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1.5 rounded-full text-xs text-gray-500 shadow-md">
              World View &bull; {trips.length} resorts
            </div>
          </>
        )}
      </main>
    </div>
  );
}
