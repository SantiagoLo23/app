export const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: "Cielo despejado",
    1: "Mayormente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Con niebla",
    51: "Llovizna",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia fuerte",
    71: "Nevada ligera",
    75: "Nevada fuerte",
    77: "Granizo",
    80: "Chubascos",
    85: "Chubascos de nieve",
    95: "Tormenta eléctrica",
    99: "Tormenta con granizo",
  };

  return weatherCodes[code] || "Clima desconocido";
};

export const getWeatherIcon = (code: number): string => {
  if (code === 0) return "☀️";
  if (code <= 3) return "🌤️";
  if (code <= 45) return "🌫️";
  if (code <= 65) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 85) return "🌨️";
  return "⛈️";
};
