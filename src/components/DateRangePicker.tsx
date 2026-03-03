'use client';

import { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date | undefined>(startDate);
  const [tempEnd, setTempEnd] = useState<Date | undefined>(endDate);

  const duration = differenceInDays(endDate, startDate);

  const handleApply = () => {
    if (tempStart && tempEnd) {
      onChange(tempStart, tempEnd);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <button className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-black transition-colors">
          <span>{format(startDate, 'MMM d')}-{format(endDate, 'MMM d')}</span>
          <span className="text-gray-400 text-[11px]">({duration} days)</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="center">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Select dates</h4>
            {tempStart && tempEnd && (
              <span className="text-xs text-gray-500">
                {differenceInDays(tempEnd, tempStart)} days
              </span>
            )}
          </div>
          
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempStart}
            selected={{
              from: tempStart,
              to: tempEnd,
            }}
            onSelect={(range) => {
              if (range?.from) setTempStart(range.from);
              if (range?.to) setTempEnd(range.to);
            }}
            numberOfMonths={2}
            disabled={(date) => date < new Date()}
          />
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTempStart(startDate);
                setTempEnd(endDate);
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleApply}
              disabled={!tempStart || !tempEnd}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
