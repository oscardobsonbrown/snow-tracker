/**
 * Origin Location Service
 * Manages configurable departure locations with Perth, WA as default
 */

import type { OriginLocation } from '@/types';

// Pre-defined origin locations
export const ORIGIN_LOCATIONS: OriginLocation[] = [
  {
    id: 'perth-wa',
    name: 'Perth, WA',
    city: 'Perth',
    country: 'Australia',
    coordinates: { lat: -31.9505, lng: 115.8605 },
    timezone: 'Australia/Perth',
    airportCode: 'PER',
  },
  {
    id: 'sydney-nsw',
    name: 'Sydney, NSW',
    city: 'Sydney',
    country: 'Australia',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    timezone: 'Australia/Sydney',
    airportCode: 'SYD',
  },
  {
    id: 'melbourne-vic',
    name: 'Melbourne, VIC',
    city: 'Melbourne',
    country: 'Australia',
    coordinates: { lat: -37.8136, lng: 144.9631 },
    timezone: 'Australia/Melbourne',
    airportCode: 'MEL',
  },
  {
    id: 'brisbane-qld',
    name: 'Brisbane, QLD',
    city: 'Brisbane',
    country: 'Australia',
    coordinates: { lat: -27.4698, lng: 153.0251 },
    timezone: 'Australia/Brisbane',
    airportCode: 'BNE',
  },
  {
    id: 'adelaide-sa',
    name: 'Adelaide, SA',
    city: 'Adelaide',
    country: 'Australia',
    coordinates: { lat: -34.9285, lng: 138.6007 },
    timezone: 'Australia/Adelaide',
    airportCode: 'ADL',
  },
  {
    id: 'auckland-nz',
    name: 'Auckland, NZ',
    city: 'Auckland',
    country: 'New Zealand',
    coordinates: { lat: -36.8485, lng: 174.7633 },
    timezone: 'Pacific/Auckland',
    airportCode: 'AKL',
  },
  {
    id: 'singapore-sg',
    name: 'Singapore',
    city: 'Singapore',
    country: 'Singapore',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    timezone: 'Asia/Singapore',
    airportCode: 'SIN',
  },
];

// Default origin location (Perth, WA)
export const DEFAULT_ORIGIN = ORIGIN_LOCATIONS[0];

// Storage key for localStorage
const STORAGE_KEY = 'snowtrack-origin';

/**
 * Get the currently selected origin location
 * Falls back to default if none stored
 */
export function getOrigin(): OriginLocation {
  if (typeof window === 'undefined') {
    return DEFAULT_ORIGIN;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Verify it's a valid origin
      const found = ORIGIN_LOCATIONS.find(o => o.id === parsed.id);
      if (found) return found;
    } catch {
      // Invalid stored data, fall through to default
    }
  }

  return DEFAULT_ORIGIN;
}

/**
 * Set the origin location by ID
 */
export function setOrigin(originId: string): OriginLocation | null {
  const origin = ORIGIN_LOCATIONS.find(o => o.id === originId);
  if (!origin) return null;

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
  }

  return origin;
}

/**
 * Set a custom origin location
 */
export function setCustomOrigin(origin: OriginLocation): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
  }
}

/**
 * Get timezone difference between origin and destination
 * Returns hours difference (can be negative)
 */
export function getTimezoneDifference(
  originTimezone: string,
  destinationTimezone: string
): number {
  const now = new Date();

  // Create dates in both timezones
  const originDate = new Date(now.toLocaleString('en-US', { timeZone: originTimezone }));
  const destDate = new Date(now.toLocaleString('en-US', { timeZone: destinationTimezone }));

  // Calculate difference in hours
  return (destDate.getTime() - originDate.getTime()) / (1000 * 60 * 60);
}

/**
 * Calculate timezone disruption score
 * 100 = same timezone, 0 = worst disruption (12+ hour difference)
 */
export function calculateTimezoneDisruptionScore(hoursDifference: number): number {
  const absDiff = Math.abs(hoursDifference);

  // 0-2 hours: excellent (90-100)
  if (absDiff <= 2) {
    return 100 - (absDiff * 5);
  }

  // 2-6 hours: good (70-90)
  if (absDiff <= 6) {
    return 90 - ((absDiff - 2) * 5);
  }

  // 6-12 hours: fair (50-70)
  if (absDiff <= 12) {
    return 70 - ((absDiff - 6) * 3.33);
  }

  // 12+ hours: poor (below 50)
  return Math.max(30, 50 - ((absDiff - 12) * 2));
}
