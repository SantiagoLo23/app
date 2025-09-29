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
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  weathercode: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  hourly: HourlyForecast;
}

export interface FavoriteCity {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  addedAt: string;
}
