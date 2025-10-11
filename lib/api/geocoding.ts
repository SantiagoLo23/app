import { City } from "@/types/weather";

interface GeocodingResult {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

export async function searchCities(query: string): Promise<City[]> {
  if (!query || query.length < 2) return [];

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=5&language=es&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al buscar ciudades");
    }

    const data: GeocodingResponse = await response.json();

    if (!data.results) return [];

    return data.results.map((city) => ({
      id: city.id,
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      admin1: city.admin1,
    }));
  } catch (error) {
    console.error("Error en searchCities:", error);
    return [];
  }
}
