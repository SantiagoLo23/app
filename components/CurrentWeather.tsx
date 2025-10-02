"use client";
import { City } from "@/types/weather";
import { getWeatherDescription, getWeatherIcon } from "@/lib/weatherCodes";
import { MapPin, Droplets, Thermometer, Heart } from "lucide-react";
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites";
import { useState } from "react";

interface CurrentWeatherProps {
  city: City;
  temperature: number;
  humidity: number;
  weathercode: number;
}

export default function CurrentWeather({
  city,
  temperature,
  humidity,
  weathercode,
}: CurrentWeatherProps) {
  const [favorite, setFavorite] = useState(isFavorite(city.id));

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(city.id);
      setFavorite(false);
    } else {
      addFavorite({
        id: city.id,
        name: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      });
      setFavorite(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-2xl p-8 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={24} />
          <div>
            <h2 className="text-3xl font-bold">{city.name}</h2>
            <p className="text-blue-100">{city.country}</p>
          </div>
        </div>

        <button
          onClick={handleToggleFavorite}
          className={`p-3 rounded-full transition-all ${
            favorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-white/20 hover:bg-white/30"
          }`}
          title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart size={24} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-4">
          <span className="text-7xl">{getWeatherIcon(weathercode)}</span>
          <div>
            <div className="text-6xl font-bold">
              {Math.round(temperature)}°C
            </div>
            <div className="text-xl text-blue-100 mt-2">
              {getWeatherDescription(weathercode)}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <Droplets size={20} />
            <span className="text-lg">Humedad: {humidity}%</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Thermometer size={20} />
            <span className="text-lg">Sensación térmica</span>
          </div>
        </div>
      </div>
    </div>
  );
}
