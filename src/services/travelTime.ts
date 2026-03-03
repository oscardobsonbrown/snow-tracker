/**
 * Travel Time Calculation Engine
 * Calculates total travel time including flights and ground transfers
 */

import type { OriginLocation, Resort } from '@/types';
import { estimateFlightCost } from './flights';
import { getRecommendedTransfer } from './transfers';

/**
 * Calculate total travel time from origin to resort
 */
export function calculateTotalTravelTime(
  origin: OriginLocation,
  resort: Resort
): number {
  // Get flight duration
  const flightEstimate = estimateFlightCost(origin, resort.airportCode);
  const flightDuration = flightEstimate.duration;
  
  // Get transfer duration
  const transfer = getRecommendedTransfer(resort.airportCode);
  const transferDuration = transfer ? transfer.duration / 60 : 1.5; // Convert minutes to hours
  
  // Add buffer times:
  // - Airport arrival: 2 hours before
  // - Airport exit/transfer: 1 hour
  // - Resort check-in: 30 minutes
  const bufferHours = 3.5;
  
  return flightDuration + transferDuration + bufferHours;
}

/**
 * Calculate travel score based on total travel time
 * 100 = Excellent (under 10 hours)
 * 0 = Poor (30+ hours)
 */
export function calculateTravelScore(totalTravelTime: number): number {
  // Under 8 hours: Excellent (90-100)
  if (totalTravelTime <= 8) {
    return 100 - (totalTravelTime - 6) * 5; // 100 at 6h, 90 at 8h
  }
  
  // 8-12 hours: Good (70-90)
  if (totalTravelTime <= 12) {
    return 90 - (totalTravelTime - 8) * 5; // 90 at 8h, 70 at 12h
  }
  
  // 12-20 hours: Fair (50-70)
  if (totalTravelTime <= 20) {
    return 70 - (totalTravelTime - 12) * 2.5; // 70 at 12h, 50 at 20h
  }
  
  // 20-30 hours: Poor (30-50)
  if (totalTravelTime <= 30) {
    return 50 - (totalTravelTime - 20) * 2; // 50 at 20h, 30 at 30h
  }
  
  // Over 30 hours: Very poor (below 30)
  return Math.max(10, 30 - (totalTravelTime - 30) * 0.5);
}

/**
 * Format travel time for display
 */
export function formatTravelTime(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours}h`;
  }
  
  return `${wholeHours}h ${minutes}m`;
}

/**
 * Get travel time breakdown
 */
export function getTravelTimeBreakdown(
  origin: OriginLocation,
  resort: Resort
): {
  flight: number;
  transfer: number;
  buffer: number;
  total: number;
} {
  const flightEstimate = estimateFlightCost(origin, resort.airportCode);
  const transfer = getRecommendedTransfer(resort.airportCode);
  
  const flightDuration = flightEstimate.duration;
  const transferDuration = transfer ? transfer.duration / 60 : 1.5;
  const buffer = 3.5;
  
  return {
    flight: flightDuration,
    transfer: transferDuration,
    buffer,
    total: flightDuration + transferDuration + buffer,
  };
}
