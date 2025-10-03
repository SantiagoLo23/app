import { WeatherData } from "@/types/weather";

export async function getWeatherForecast(
  latitude: number,
  longitude: number
): Promise<WeatherData | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weathercode&hourly=temperature_2m,relativehumidity_2m,weathercode,apparent_temperature&forecast_days=3&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener el pronóstico");
    }

    const data = await response.json();

    return {
      current_weather: {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        weathercode: data.current.weathercode,
        apparent_temperature: data.current.apparent_temperature,
        time: data.current.time,
      },
      hourly: {
        time: data.hourly.time,
        temperature_2m: data.hourly.temperature_2m,
        relativehumidity_2m: data.hourly.relativehumidity_2m,
        weathercode: data.hourly.weathercode,
        apparent_temperature: data.hourly.apparent_temperature,
      },
      current: {
        apparent_temperature: data.current.apparent_temperature,
      },
    };
  } catch (error) {
    console.error("Error en getWeatherForecast:", error);
    return null;
  }
}
