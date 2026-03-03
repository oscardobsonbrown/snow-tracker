/**
 * Weather/Snow Data Service
 * Fetches real-time snow conditions and forecasts from weather APIs
 * 
 * This service can integrate with multiple weather APIs:
 - OpenWeatherMap (requires API key)
 - WeatherAPI.com (requires API key)
 - Open-Meteo (free, no API key required)
 - Snow-Forecast.com (ski-specific)
 */

import type { SnowConditions } from '@/types';

// Using Open-Meteo API (free, no API key required)
const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1';

interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  hourly?: {
    time: string[];
    snowfall: number[];
    temperature_2m: number[];
  };
  daily?: {
    time: string[];
    snowfall_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  current_weather?: {
    temperature: number;
    weathercode: number;
  };
}

/**
 * Fetch snow data from Open-Meteo API
 * This is a free API that doesn't require an API key
 */
export async function fetchSnowData(
  lat: number,
  lng: number,
  days: number = 7
): Promise<Partial<SnowConditions> | null> {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      hourly: 'snowfall,temperature_2m',
      daily: 'snowfall_sum,temperature_2m_max,temperature_2m_min',
      current_weather: 'true',
      forecast_days: days.toString(),
      timezone: 'auto',
    });

    const response = await fetch(`${OPEN_METEO_BASE_URL}/forecast?${params}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: OpenMeteoResponse = await response.json();

    // Calculate snow depth (Open-Meteo provides snowfall in cm)
    // Note: This is fresh snowfall, not base depth
    const snowfallData = data.daily?.snowfall_sum || [];
    const totalSnowfall = snowfallData.reduce((sum, val) => sum + val, 0);
    
    // Estimate base depth (this would ideally come from a ski resort API)
    // For now, we'll use a combination of recent snowfall and historical data
    const estimatedBaseDepth = Math.max(30, Math.round(totalSnowfall * 2));

    // Get forecast
    const forecast = [];
    if (data.daily) {
      for (let i = 0; i < Math.min(days, data.daily.time.length); i++) {
        forecast.push({
          date: data.daily.time[i],
          snowfall: Math.round(data.daily.snowfall_sum[i] || 0),
          temperature: Math.round((data.daily.temperature_2m_min[i] + data.daily.temperature_2m_max[i]) / 2),
        });
      }
    }

    return {
      baseDepth: estimatedBaseDepth,
      last24Hours: Math.round(snowfallData[0] || 0),
      last7Days: Math.round(totalSnowfall),
      temperature: Math.round(data.current_weather?.temperature || 0),
      forecast: forecast,
    };
  } catch (error) {
    console.error('Failed to fetch snow data:', error);
    return null;
  }
}

/**
 * Fetch snow data for multiple resorts
 */
export async function fetchSnowDataForResorts(
  resorts: { id: string; coordinates: { lat: number; lng: number } }[]
): Promise<Record<string, Partial<SnowConditions>>> {
  const results: Record<string, Partial<SnowConditions>> = {};

  // Fetch data for each resort with a small delay to avoid rate limiting
  for (const resort of resorts) {
    const data = await fetchSnowData(resort.coordinates.lat, resort.coordinates.lng);
    if (data) {
      results[resort.id] = data;
    }
    // Small delay to be nice to the API
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
}

/**
 * Alternative: Using OpenWeatherMap (requires API key)
 * Set OPENWEATHER_API_KEY in environment variables
 */
export async function fetchSnowDataOpenWeather(
  lat: number,
  lng: number,
  apiKey?: string
): Promise<Partial<SnowConditions> | null> {
  const key = apiKey || process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  
  if (!key) {
    console.warn('OpenWeatherMap API key not provided');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${key}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Process OpenWeatherMap data
    // Note: OpenWeatherMap doesn't provide snow depth directly,
    // only snowfall in the last 3 hours
    
    return {
      temperature: Math.round(data.list[0]?.main?.temp || 0),
      forecast: data.list?.slice(0, 7).map((item: { dt_txt: string; main: { temp: number }; snow?: { '3h': number } }) => ({
        date: item.dt_txt,
        snowfall: Math.round((item.snow?.['3h'] || 0) * 10), // Convert to cm
        temperature: Math.round(item.main.temp),
      })),
    };
  } catch (error) {
    console.error('Failed to fetch OpenWeatherMap data:', error);
    return null;
  }
}

/**
 * Get weather icon based on weather code
 */
export function getWeatherIcon(code: number): string {
  // Open-Meteo weather codes
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, overcast
  // 45, 48: Fog
  // 51, 53, 55: Drizzle
  // 61, 63, 65: Rain
  // 71, 73, 75: Snow fall
  // 77: Snow grains
  // 80, 81, 82: Rain showers
  // 85, 86: Snow showers
  // 95, 96, 99: Thunderstorm
  
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  
  return '🌤️';
}

/**
 * Get weather description based on weather code
 */
export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return descriptions[code] || 'Unknown';
}
