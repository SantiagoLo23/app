import { FavoriteCity } from "@/types/weather";

const FAVORITES_KEY = "weather_favorites";

export const generateCityId = (latitude: number, longitude: number): number => {
  const latStr = latitude.toFixed(4).replace(".", "").replace("-", "9");
  const lonStr = longitude.toFixed(4).replace(".", "").replace("-", "9");
  return parseInt(latStr.slice(0, 5) + lonStr.slice(0, 5));
};

export const getFavorites = (): FavoriteCity[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (city: Omit<FavoriteCity, "addedAt">): void => {
  const favorites = getFavorites();
  const exists = favorites.some((fav) => fav.id === city.id);

  if (!exists) {
    const newFavorite: FavoriteCity = {
      ...city,
      addedAt: new Date().toISOString(),
    };
    favorites.push(newFavorite);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (cityId: number): void => {
  const favorites = getFavorites();
  const filtered = favorites.filter((fav) => fav.id !== cityId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
};

export const isFavorite = (cityId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === cityId);
};
