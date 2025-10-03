"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { City, WeatherData } from "@/types/weather";
import { getWeatherForecast } from "@/lib/api/weather";
import CitySearch from "@/components/CitySearch";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastTable from "@/components/ForecastTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { Cloud } from "lucide-react";

export default function Home() {
  const searchParams = useSearchParams();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cityName = searchParams.get("city");
    const country = searchParams.get("country");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (cityName && lat && lon) {
      const cityFromUrl: City = {
        id: Date.now(),
        name: cityName,
        country: country || "",
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };

      setSelectedCity(cityFromUrl);
      loadWeather(parseFloat(lat), parseFloat(lon));
    }
  }, [searchParams]);

  const loadWeather = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherForecast(latitude, longitude);

      if (!data) {
        setError(
          "No se pudo obtener el pronóstico del clima. Intenta nuevamente."
        );
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError("Ocurrió un error al consultar la API del clima.");
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySelect = async (city: City) => {
    setSelectedCity(city);
    await loadWeather(city.latitude, city.longitude);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Cloud size={48} className="text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800">
            Consulta el Clima
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Busca cualquier ciudad y obtén el pronóstico actualizado
        </p>
      </div>

      <div className="mb-8">
        <CitySearch onCitySelect={handleCitySelect} />
      </div>

      {isLoading && <LoadingSpinner />}

      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && weatherData && selectedCity && (
        <div className="space-y-6">
          <CurrentWeather
            city={selectedCity}
            temperature={weatherData.current_weather.temperature}
            humidity={weatherData.hourly.relativehumidity_2m[0]}
            weathercode={weatherData.current_weather.weathercode}
          />

          <ForecastTable forecast={weatherData.hourly} />
        </div>
      )}

      {!isLoading && !error && !weatherData && (
        <div className="text-center py-12 text-gray-500">
          <Cloud size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Busca una ciudad para ver el clima</p>
        </div>
      )}
    </div>
  );
}
