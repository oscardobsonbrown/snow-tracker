'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { OriginLocation, TravelConfig, ViewMode } from '@/types';
import { DateRangePicker } from './DateRangePicker';

interface HeaderProps {
  origin: OriginLocation;
  config: TravelConfig;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onConfigChange: (config: TravelConfig) => void;
}

export function Header({
  origin,
  config,
  viewMode,
  onViewModeChange,
  onConfigChange,
}: HeaderProps) {
  const pathname = usePathname();

  const handleDateChange = (startDate: Date, endDate: Date) => {
    onConfigChange({
      ...config,
      startDate,
      endDate,
    });
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-3 bg-white border-b border-gray-200 h-[52px]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
          <span className="text-white text-sm">&#9670;</span>
        </div>
        <span className="text-[15px] font-medium text-black hidden sm:inline">SnowTrack</span>
      </Link>

      {/* Trip Info */}
      <div className="flex items-center gap-3 sm:gap-6 text-[13px]">
        <span className="text-gray-500 hidden md:inline">
          {origin.name}
        </span>
        <span className="text-gray-300 hidden lg:inline">&#8594;</span>
        <DateRangePicker
          startDate={config.startDate}
          endDate={config.endDate}
          onChange={handleDateChange}
        />
        <span className="text-gray-500 hidden sm:inline">
          Budget <span className="text-black font-medium">${config.budget.maxTotal.toLocaleString()}</span>
        </span>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            List
          </button>
          <button
            onClick={() => onViewModeChange('map')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'map'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Map
          </button>
        </div>
      </div>
    </header>
  );
}
