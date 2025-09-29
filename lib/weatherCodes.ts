export const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Cloudy",
    45: "Foggy",
    51: "Light drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    77: "Hail",
    80: "Showers",
    95: "Thunderstorm",
    99: "Thunderstorm with hail",
  };

  return weatherCodes[code] || "Unknown weather";
};

export const getWeatherIcon = (code: number): string => {
  if (code === 0) return "☀️";
  if (code <= 3) return "🌤️";
  if (code <= 45) return "🌫️";
  if (code <= 65) return "🌧️";
  if (code === 77) return "🌨️";
  if (code <= 80) return "🌦️";
  return "⛈️";
};
