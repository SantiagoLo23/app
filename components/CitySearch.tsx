"use client";
import { useState, useEffect, useRef } from "react";
import { searchCities } from "@/lib/api/geocoding";
import { City } from "@/types/weather";
import { Search, Loader2 } from "lucide-react";

interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setShowSuggestions(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al buscar ciudades:", error);
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const handleSelectCity = (city: City) => {
    isSelectingRef.current = true;
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ciudad..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-gray-400"
        />
        {isLoading && (
          <Loader2
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 animate-spin"
            size={20}
          />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelectCity(city)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
            >
              <div className="font-semibold text-gray-900">{city.name}</div>
              <div className="text-sm text-gray-600">
                {city.admin1 && `${city.admin1}, `}
                {city.country}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showSuggestions &&
        query.length >= 2 &&
        suggestions.length === 0 &&
        !isLoading && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
            No se encontraron ciudades
          </div>
        )}
    </div>
  );
}
