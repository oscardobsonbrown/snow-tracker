/**
 * Score Calculation Engine
 * Calculates overall resort scores based on multiple factors
 */

import type { Resort, Hotel, OriginLocation, ResortScore } from '@/types';
import { calculateTotalTravelTime, calculateTravelScore } from './travelTime';
import { getTimezoneDifference, calculateTimezoneDisruptionScore } from './origin';
import { calculateHotelScore } from './hotels';

// Score weights for overall calculation
const SCORE_WEIGHTS = {
  travel: 0.25,    // 25% - Travel time
  timezone: 0.15,  // 15% - Timezone difference
  snow: 0.30,      // 30% - Snow conditions (most important)
  hotels: 0.15,    // 15% - Hotel quality
  busy: 0.15,      // 15% - Crowd levels
};

/**
 * Calculate snow conditions score
 * Based on base depth, recent snowfall, and forecast
 * 0-100 scale
 */
export function calculateSnowScore(resort: Resort): number {
  const { snow } = resort;
  let score = 0;
  
  // Base depth (0-40 points)
  // 0cm = 0, 50cm+ = 40
  const baseScore = Math.min(40, (snow.baseDepth / 50) * 40);
  score += baseScore;
  
  // Recent snowfall (0-30 points)
  // 0cm = 0, 30cm+ = 30
  const recentScore = Math.min(30, (snow.last7Days / 30) * 30);
  score += recentScore;
  
  // Last 24 hours bonus (0-15 points)
  const dailyScore = Math.min(15, (snow.last24Hours / 20) * 15);
  score += dailyScore;
  
  // Forecast (0-15 points)
  const forecastSnow = snow.forecast.reduce((sum, day) => sum + day.snowfall, 0);
  const forecastScore = Math.min(15, (forecastSnow / 50) * 15);
  score += forecastScore;
  
  return Math.round(score);
}

/**
 * Calculate crowd/busyness score
 * Lower crowds = higher score
 * 0-100 scale
 */
export function calculateBusyScore(resort: Resort): number {
  switch (resort.busyLevel) {
    case 'low':
      return 95;
    case 'medium':
      return 70;
    case 'high':
      return 45;
    default:
      return 70;
  }
}

/**
 * Calculate complete score for a resort
 */
export function calculateResortScore(
  resort: Resort,
  origin: OriginLocation,
  hotel: Hotel
): ResortScore {
  // Calculate component scores
  const travelTime = calculateTotalTravelTime(origin, resort);
  const travelScore = calculateTravelScore(travelTime);
  
  const timezoneDiff = getTimezoneDifference(origin.timezone, resort.timezone);
  const timezoneScore = calculateTimezoneDisruptionScore(timezoneDiff);
  
  const snowScore = calculateSnowScore(resort);
  const hotelScore = calculateHotelScore(hotel);
  const busyScore = calculateBusyScore(resort);
  
  // Calculate weighted overall score
  const overall = Math.round(
    travelScore * SCORE_WEIGHTS.travel +
    timezoneScore * SCORE_WEIGHTS.timezone +
    snowScore * SCORE_WEIGHTS.snow +
    hotelScore * SCORE_WEIGHTS.hotels +
    busyScore * SCORE_WEIGHTS.busy
  );
  
  return {
    overall,
    components: {
      travel: Math.round(travelScore),
      timezone: Math.round(timezoneScore),
      snow: Math.round(snowScore),
      hotels: Math.round(hotelScore),
      busy: Math.round(busyScore),
    },
  };
}

/**
 * Get score color based on value
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return '#22c55e'; // Green
  if (score >= 70) return '#84cc16'; // Lime
  if (score >= 50) return '#eab308'; // Yellow
  if (score >= 30) return '#f97316'; // Orange
  return '#ef4444'; // Red
}

/**
 * Get score label based on value
 */
export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Poor';
  return 'Avoid';
}

/**
 * Get component score explanation
 */
export function getScoreExplanation(
  component: keyof ResortScore['components'],
  score: number
): string {
  const explanations: Record<string, string[]> = {
    travel: [
      'Short travel time from your location',
      'Reasonable travel time',
      'Long travel time',
      'Very long journey',
    ],
    timezone: [
      'Minimal jet lag',
      'Some timezone adjustment needed',
      'Significant jet lag expected',
      'Major timezone disruption',
    ],
    snow: [
      'Excellent snow conditions',
      'Good snow coverage',
      'Fair snow conditions',
      'Poor snow conditions',
    ],
    hotels: [
      'Top-tier accommodation available',
      'Good hotel options',
      'Limited quality options',
      'Few good hotels',
    ],
    busy: [
      'Uncrowded slopes',
      'Moderate crowds',
      'Busy resort',
      'Very crowded',
    ],
  };
  
  const index = score >= 90 ? 0 : score >= 70 ? 1 : score >= 50 ? 2 : 3;
  return explanations[component][index];
}
