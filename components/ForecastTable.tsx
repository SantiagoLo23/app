"use client";
import { HourlyForecast } from "@/types/weather";
import { getWeatherDescription, getWeatherIcon } from "@/lib/weatherCodes";

interface ForecastTableProps {
  forecast: HourlyForecast;
}

export default function ForecastTable({ forecast }: ForecastTableProps) {
  const hourlyData = forecast.time
    .map((time, index) => ({
      time,
      temperature: forecast.temperature_2m[index],
      humidity: forecast.relativehumidity_2m[index],
      weathercode: forecast.weathercode[index],
    }))
    .filter((_, index) => index % 3 === 0)
    .slice(0, 24);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const time = date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { day, time };
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Pronóstico extendido (3 días)
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">
                Fecha y Hora
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Clima
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Temperatura
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 rounded-tr-lg">
                Humedad
              </th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((data, index) => {
              const { day, time } = formatDate(data.time);
              return (
                <tr
                  key={data.time}
                  className={`border-b last:border-b-0 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{day}</div>
                    <div className="text-sm text-gray-600">{time}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-3xl">
                        {getWeatherIcon(data.weathercode)}
                      </span>
                      <span className="text-xs text-gray-600">
                        {getWeatherDescription(data.weathercode)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {Math.round(data.temperature)}°C
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-gray-700">{data.humidity}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
