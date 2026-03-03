'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, ChevronDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import type { OriginLocation, TravelConfig, ViewMode } from '@/types';
import { ORIGIN_LOCATIONS } from '@/services/origin';

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
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date>(config.startDate);
  const [tempEnd, setTempEnd] = useState<Date>(config.endDate);

  const duration = Math.ceil(
    (config.endDate.getTime() - config.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleLocationChange = (newOrigin: OriginLocation) => {
    onConfigChange({
      ...config,
      origin: newOrigin,
    });
    setIsLocationOpen(false);
  };

  const handleDateApply = () => {
    onConfigChange({
      ...config,
      startDate: tempStart,
      endDate: tempEnd,
    });
    setIsDateOpen(false);
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

      {/* Trip Info - Editable */}
      <div className="flex items-center gap-2 sm:gap-4 text-[13px]">
        {/* Location Selector */}
        <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
          <PopoverTrigger>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-700 hidden md:inline">{origin.name}</span>
              <span className="text-gray-700 md:hidden">{origin.city}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium mb-2 px-2">
              Select Origin
            </div>
            <div className="flex flex-col gap-1">
              {ORIGIN_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleLocationChange(loc)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors ${
                    origin.id === loc.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{loc.name}</span>
                  {origin.id === loc.id && <span>&#10003;</span>}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <span className="text-gray-300 hidden lg:inline">&#8594;</span>

        {/* Date Selector */}
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-700">
                {format(config.startDate, 'MMM d')}-{format(config.endDate, 'MMM d')}
              </span>
              <span className="text-gray-400 text-[11px]">({duration}d)</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="center">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Select dates</h4>
              </div>
              
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-gray-400 uppercase">Start</span>
                  <Calendar
                    mode="single"
                    selected={tempStart}
                    onSelect={(date) => date && setTempStart(date)}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-gray-400 uppercase">End</span>
                  <Calendar
                    mode="single"
                    selected={tempEnd}
                    onSelect={(date) => date && setTempEnd(date)}
                    disabled={(date) => date <= tempStart}
                    className="rounded-md border"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTempStart(config.startDate);
                    setTempEnd(config.endDate);
                    setIsDateOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleDateApply}
                  disabled={tempEnd <= tempStart}
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Budget */}
        <span className="text-gray-500 hidden sm:inline ml-2">
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
