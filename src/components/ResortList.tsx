'use client';

import type { TripCalculation } from '@/types';

interface ResortListProps {
  trips: TripCalculation[];
}

export function ResortList({ trips }: ResortListProps) {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      {trips.map((trip) => (
        <div
          key={trip.resort.id}
          className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center text-lg text-gray-600">
              &#9670;
            </div>
            <div>
              <div className="text-[15px] font-medium text-black">{trip.resort.name}</div>
              <div className="text-xs text-gray-400">
                {trip.resort.region}, {trip.resort.country}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-center">
              <div className="text-lg font-semibold text-black">{trip.resort.snow.baseDepth}cm</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Base</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-black">{Math.round(trip.totalTravelTime)}h</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Travel</div>
            </div>
            <div className="text-center">
              <div
                className={`text-lg font-semibold ${
                  trip.cost.underBudget >= 0
                    ? 'text-green-500'
                    : trip.cost.underBudget > -1000
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              >
                {trip.cost.underBudget >= 0 ? '-' : '+'}${Math.abs(Math.round(trip.cost.underBudget)).toLocaleString()}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                {trip.cost.underBudget >= 0 ? 'Under' : 'Over'}
              </div>
            </div>
            <div className="text-right min-w-[80px]">
              <div className="text-[17px] font-semibold text-black">${trip.cost.total.toLocaleString()}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">7 days</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
