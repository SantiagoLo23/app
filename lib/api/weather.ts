import { WeatherData } from "@/types/weather";

export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode&forecast_days=3&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener el pronóstico");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getWeatherForecast:", error);
    return null;
  }
}
