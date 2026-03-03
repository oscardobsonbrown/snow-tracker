'use client';

import { useState, useEffect, useMemo } from 'react';
import type { TripCalculation, HotelChain, TravelConfig, Resort } from '@/types';
import { calculateAllTrips } from '@/services/trip';
import { DEFAULT_ORIGIN } from '@/services/origin';
import { applySearchAndFilters } from '@/services/search';
import type { SearchFilters } from '@/services/search';
import { fetchSnowDataForResorts } from '@/services/weather';
import { Header } from '@/components/Header';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ResortList } from '@/components/ResortList';
import { getAllResorts } from '@/data/resorts';

export default function ListPage() {
  const [trips, setTrips] = useState<TripCalculation[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLoading, setIsLoading] = useState(true);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

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

  const [filters, setFilters] = useState({
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
    search: {
      query: '',
      minSnowDepth: 0,
      resortSize: [] as ('small' | 'medium' | 'large' | 'epic')[],
      minScore: 0,
    } as SearchFilters,
  });

  // Initial load with mock data
  useEffect(() => {
    setIsLoading(true);
    const calculatedTrips = calculateAllTrips(config, filters.hotel);
    setTrips(calculatedTrips);
    setIsLoading(false);
  }, [config, filters.hotel]);

  // Fetch real weather data
  useEffect(() => {
    const fetchWeather = async () => {
      setIsWeatherLoading(true);
      try {
        const resorts = getAllResorts();
        const weatherData = await fetchSnowDataForResorts(
          resorts.map((r) => ({ id: r.id, coordinates: r.coordinates }))
        );

        // Update trips with real weather data
        setTrips((currentTrips) =>
          currentTrips.map((trip) => {
            const realData = weatherData[trip.resort.id];
            if (realData) {
              return {
                ...trip,
                resort: {
                  ...trip.resort,
                  snow: {
                    ...trip.resort.snow,
                    ...realData,
                  } as typeof trip.resort.snow,
                },
              };
            }
            return trip;
          })
        );
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        // Keep using mock data on error
      } finally {
        setIsWeatherLoading(false);
      }
    };

    if (trips.length > 0) {
      fetchWeather();
    }
  }, []); // Only fetch once on mount

  // Apply search and additional filters
  const filteredTrips = useMemo(() => {
    return applySearchAndFilters(trips, filters.search);
  }, [trips, filters.search]);

  const handleViewModeChange = (mode: 'list' | 'map') => {
    setViewMode(mode);
    if (mode === 'map') {
      window.location.href = '/map';
    }
  };

  const handleConfigChange = (newConfig: TravelConfig) => {
    setConfig(newConfig);
  };

  const handleFilterChange = (newFilters: { hotel: typeof filters.hotel; search: SearchFilters }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header
        origin={config.origin}
        config={config}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onConfigChange={handleConfigChange}
      />

      <main className="flex flex-col lg:flex-row px-4 sm:px-8 py-6 gap-6 h-[calc(100vh-52px)]">
        <div className="hidden lg:block">
          <FilterSidebar
            config={config}
            filters={filters}
            onConfigChange={handleConfigChange}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <p className="text-[13px] text-gray-500">
                {filteredTrips.length} {filteredTrips.length === 1 ? 'destination' : 'destinations'} found
                {filters.search.query && ` for "${filters.search.query}"`}
              </p>
              {isWeatherLoading && (
                <span className="text-[11px] text-blue-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Updating snow data...
                </span>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading resorts...</div>
            </div>
          ) : (
            <ResortList trips={filteredTrips} />
          )}
        </div>
      </main>
    </div>
  );
}
