"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FavoriteCity } from "@/types/weather";
import { getFavorites, removeFavorite } from "@/lib/favorites";
import { Heart, Trash2, MapPin } from "lucide-react";

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const router = useRouter();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (cityId: number) => {
    removeFavorite(cityId);
    setFavorites(getFavorites());
  };

  const handleViewWeather = (city: FavoriteCity) => {
    // Redirigir al home y pasar datos mediante query params
    router.push(
      `/?city=${encodeURIComponent(city.name)}&lat=${city.latitude}&lon=${
        city.longitude
      }`
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={36} className="text-red-500" fill="currentColor" />
        <h1 className="text-4xl font-bold text-gray-800">Mis Favoritos</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Heart size={64} className="mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            No tienes ciudades favoritas
          </h2>
          <p className="text-gray-500">
            Agrega ciudades a favoritos desde la búsqueda principal
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((city) => (
            <div
              key={city.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-blue-500 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {city.name}
                    </h3>
                    <p className="text-gray-600">{city.country}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Agregado:{" "}
                      {new Date(city.addedAt).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(city.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar de favoritos"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <button
                onClick={() => handleViewWeather(city)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Ver clima
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
