# Ejemplos request/response de API

## 1. Geocoding API - Búsqueda de Ciudades

### Ejemplo de Request

GET https://geocoding-api.open-meteo.com/v1/search?name=Medellín&count=5&language=es&format=json

### Ejemplo de Response y pa los que no saben ingles respuesta

{
"results": [
{
"id": 3674962,
"name": "Medellín",
"latitude": 6.25184,
"longitude": -75.56359,
"elevation": 1484.0,
"feature_code": "PPLA",
"country_code": "CO",
"admin1_id": 3689815,
"admin2_id": 3674961,
"admin3_id": 11257210,
"timezone": "America/Bogota",
"population": 1999979,
"country_id": 3686110,
"country": "Colombia",
"admin1": "Antioquia",
"admin2": "Medellín"
}
]
}

### Manejo de Errores (el mayor fue estudiar mecatronica en la EIA)

Sin resultados: results será undefined o array vacío
Ciudad no encontrada: Response 200 con results: []
Error de red: Manejar con try-catch

## 2. Weather Forecast API - Pronóstico del Clima

### Ejemplo de Request

GET https://api.open-meteo.com/v1/forecast?latitude=6.25184&longitude=-75.56359&current=temperature_2m,relative_humidity_2m,apparent_temperature,weathercode&hourly=temperature_2m,relativehumidity_2m,weathercode,apparent_temperature&forecast_days=3&timezone=auto

### Ejemplo de Response

{
"latitude": 6.25,
"longitude": -75.5625,
"generationtime_ms": 0.18596649169921875,
"utc_offset_seconds": -18000,
"timezone": "America/Bogota",
"timezone_abbreviation": "-05",
"elevation": 1508.0,
"current_units": {
"time": "iso8601",
"interval": "seconds",
"temperature_2m": "°C",
"relative_humidity_2m": "%",
"apparent_temperature": "°C",
"weathercode": "wmo code"
},
"current": {
"time": "2025-09-29T14:00",
"interval": 900,
"temperature_2m": 22.8,
"relative_humidity_2m": 65,
"apparent_temperature": 24.1,
"weathercode": 3
},
"hourly_units": {
"time": "iso8601",
"temperature_2m": "°C",
"relativehumidity_2m": "%",
"weathercode": "wmo code",
"apparent_temperature": "°C"
},
"hourly": {
"time": [
"2025-09-29T00:00",
"2025-09-29T01:00",
"2025-09-29T02:00"
],
"temperature_2m": [18.2, 17.8, 17.5],
"relativehumidity_2m": [88, 90, 91],
"weathercode": [3, 3, 2],
"apparent_temperature": [18.0, 17.5, 17.2]
}
}

### Manejo de Errores

Coordenadas inválidas: Response 400
API no disponible: Response 500 o timeout
Datos incompletos: Verificar que current y hourly existan

## 3. Ejemplo de uso de la app parchadita

### Usuario busca "Medell" porque es un perezoso y no quiere terminar de escribir

const cities = await searchCities("Medellín");

### Usuario selecciona ciudad

const weather = await getWeatherForecast(6.25184, -75.56359);

### Mostrar datos al usuario (en este caso a Sebas mientras se toma su cerveza)

Temperatura actual: weather.current.temperature_2m
Sensación térmica: weather.current.apparent_temperature
Humedad: weather.current.relative_humidity_2m
Condición climática: Usar weathercode con función getWeatherDescription()
Tabla horaria: Iterar sobre weather.hourly
