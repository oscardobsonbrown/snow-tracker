'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { TravelConfig, HotelFilters } from '@/types';
import type { SearchFilters } from '@/services/search';

interface FilterSidebarProps {
  config: TravelConfig;
  filters: {
    hotel: HotelFilters;
    search: SearchFilters;
  };
  onConfigChange: (config: TravelConfig) => void;
  onFilterChange: (filters: { hotel: HotelFilters; search: SearchFilters }) => void;
}

export function FilterSidebar({ config, filters, onFilterChange }: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search.query);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFilterChange({
      ...filters,
      search: {
        ...filters.search,
        query: value,
      },
    });
  };

  const handleSnowDepthChange = (value: number) => {
    onFilterChange({
      ...filters,
      search: {
        ...filters.search,
        minSnowDepth: value,
      },
    });
  };

  const handleResortSizeChange = (size: 'small' | 'medium' | 'large' | 'epic') => {
    const currentSizes = filters.search.resortSize;
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];
    
    onFilterChange({
      ...filters,
      search: {
        ...filters.search,
        resortSize: newSizes,
      },
    });
  };

  const handleMinScoreChange = (value: number) => {
    onFilterChange({
      ...filters,
      search: {
        ...filters.search,
        minScore: value,
      },
    });
  };

  return (
    <aside className="w-full lg:w-60 flex flex-col gap-5 overflow-y-auto pr-4 py-2">
      {/* Search */}
      <div className="flex flex-col gap-2 px-1">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Search</div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <Input
            type="text"
            placeholder="Search resorts..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 h-9 text-sm focus-visible:ring-2 focus-visible:ring-offset-1"
          />
        </div>
      </div>

      {/* Snow Depth Filter */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Snow Depth</div>
        <div className="flex flex-col gap-1.5">
          {[
            { value: 0, label: 'Any depth' },
            { value: 50, label: '50cm+' },
            { value: 100, label: '100cm+' },
            { value: 150, label: '150cm+' },
            { value: 200, label: '200cm+' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  filters.search.minSnowDepth === option.value
                    ? 'bg-black border-black'
                    : 'border-gray-300'
                }`}
              >
                {filters.search.minSnowDepth === option.value && (
                  <span className="text-white text-[10px]">&#10003;</span>
                )}
              </div>
              <input
                type="radio"
                name="snowDepth"
                className="hidden"
                checked={filters.search.minSnowDepth === option.value}
                onChange={() => handleSnowDepthChange(option.value)}
              />
              <span className="text-xs text-gray-600">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Resort Size Filter */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Resort Size</div>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'epic', label: 'Epic' },
          ].map((size) => (
            <button
              key={size.value}
              onClick={() => handleResortSizeChange(size.value as 'small' | 'medium' | 'large' | 'epic')}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                filters.search.resortSize.includes(size.value as 'small' | 'medium' | 'large' | 'epic')
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Score Filter */}
      <div className="flex flex-col gap-2">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Min Score</div>
        <select
          value={filters.search.minScore}
          onChange={(e) => handleMinScoreChange(Number(e.target.value))}
          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-xs text-gray-600 focus:outline-none focus:border-black focus:ring-2 focus:ring-offset-1"
        >
          <option value={0}>Any score</option>
          <option value={50}>50+</option>
          <option value={60}>60+</option>
          <option value={70}>70+</option>
          <option value={80}>80+</option>
          <option value={90}>90+</option>
        </select>
      </div>
    </aside>
  );
}
