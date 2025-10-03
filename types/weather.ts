export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  weathercode: number;
  time: string;
  apparent_temperature?: number;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
  apparent_temperature?: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  hourly: HourlyForecast;
  current?: {
    apparent_temperature?: number;
  };
}

export interface FavoriteCity {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  addedAt: string;
}
