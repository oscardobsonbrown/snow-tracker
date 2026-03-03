/**
 * Search and Filter Utilities
 * Handles searching resorts and additional filters
 */

import type { Resort, TripCalculation } from '@/types';

export interface SearchFilters {
  query: string;
  minSnowDepth: number;
  resortSize: ('small' | 'medium' | 'large' | 'epic')[];
  minScore: number;
}

/**
 * Search resorts by name, region, or country
 */
export function searchResorts(
  trips: TripCalculation[],
  query: string
): TripCalculation[] {
  if (!query.trim()) return trips;
  
  const searchTerm = query.toLowerCase().trim();
  
  return trips.filter((trip) => {
    const { resort } = trip;
    return (
      resort.name.toLowerCase().includes(searchTerm) ||
      resort.region.toLowerCase().includes(searchTerm) ||
      resort.country.toLowerCase().includes(searchTerm)
    );
  });
}

/**
 * Filter by minimum snow depth
 */
export function filterBySnowDepth(
  trips: TripCalculation[],
  minDepth: number
): TripCalculation[] {
  if (minDepth <= 0) return trips;
  return trips.filter((trip) => trip.resort.snow.baseDepth >= minDepth);
}

/**
 * Filter by resort size
 */
export function filterByResortSize(
  trips: TripCalculation[],
  sizes: ('small' | 'medium' | 'large' | 'epic')[]
): TripCalculation[] {
  if (sizes.length === 0) return trips;
  return trips.filter((trip) => sizes.includes(trip.resort.size));
}

/**
 * Filter by minimum overall score
 */
export function filterByMinScore(
  trips: TripCalculation[],
  minScore: number
): TripCalculation[] {
  if (minScore <= 0) return trips;
  return trips.filter((trip) => trip.score.overall >= minScore);
}

/**
 * Apply all search and filter criteria
 */
export function applySearchAndFilters(
  trips: TripCalculation[],
  filters: SearchFilters
): TripCalculation[] {
  let results = [...trips];
  
  // Apply search
  if (filters.query) {
    results = searchResorts(results, filters.query);
  }
  
  // Apply snow depth filter
  if (filters.minSnowDepth > 0) {
    results = filterBySnowDepth(results, filters.minSnowDepth);
  }
  
  // Apply resort size filter
  if (filters.resortSize.length > 0) {
    results = filterByResortSize(results, filters.resortSize);
  }
  
  // Apply minimum score filter
  if (filters.minScore > 0) {
    results = filterByMinScore(results, filters.minScore);
  }
  
  return results;
}

/**
 * Get snow depth options for filter
 */
export function getSnowDepthOptions(): { value: number; label: string }[] {
  return [
    { value: 0, label: 'Any depth' },
    { value: 50, label: '50cm+' },
    { value: 100, label: '100cm+' },
    { value: 150, label: '150cm+' },
    { value: 200, label: '200cm+' },
  ];
}

/**
 * Get resort size options for filter
 */
export function getResortSizeOptions(): { value: 'small' | 'medium' | 'large' | 'epic'; label: string }[] {
  return [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'epic', label: 'Epic' },
  ];
}

/**
 * Get minimum score options for filter
 */
export function getMinScoreOptions(): { value: number; label: string }[] {
  return [
    { value: 0, label: 'Any score' },
    { value: 50, label: '50+' },
    { value: 60, label: '60+' },
    { value: 70, label: '70+' },
    { value: 80, label: '80+' },
    { value: 90, label: '90+' },
  ];
}
