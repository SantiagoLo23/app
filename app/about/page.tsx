import { Info, Github, Cloud, Code } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Info size={36} className="text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-800">Sobre la App</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Cloud className="text-blue-500" />
            ¿Qué es Weather App?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Weather App es una aplicación web moderna que te permite consultar
            el pronóstico del clima de cualquier ciudad del mundo. Obtén
            información actualizada sobre temperatura, humedad y condiciones
            climáticas para los próximos 3 días.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Características
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              <span>Búsqueda inteligente de ciudades con autocompletado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              <span>Pronóstico detallado del clima actual y 3 días</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              <span>Sistema de favoritos para acceso rápido</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              <span>Interfaz moderna y responsive</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              <span>Datos en tiempo real desde Open-Meteo API</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Code className="text-purple-500" />
            Tecnologías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Next.js 14", color: "bg-black" },
              { name: "TypeScript", color: "bg-blue-600" },
              { name: "Tailwind CSS", color: "bg-cyan-500" },
              { name: "Open-Meteo API", color: "bg-orange-500" },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`${tech.color} text-white rounded-lg p-4 text-center font-semibold shadow-md`}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            API Utilizada
          </h2>
          <p className="text-gray-600 mb-3">
            Esta aplicación utiliza <strong>Open-Meteo</strong>, una API
            gratuita y de código abierto para pronósticos meteorológicos.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Geocoding API:
              </p>
              <code className="text-xs bg-gray-800 text-green-400 px-3 py-2 rounded block overflow-x-auto">
                https://geocoding-api.open-meteo.com/v1/search
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Forecast API:
              </p>
              <code className="text-xs bg-gray-800 text-green-400 px-3 py-2 rounded block overflow-x-auto">
                https://api.open-meteo.com/v1/forecast
              </code>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Github size={28} />
            Proyecto Académico
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Desarrollado como parte del curso de <strong>Ingeniería Web</strong>{" "}
            en la Universidad EIA. Este proyecto demuestra el uso de Next.js 14
            con App Router, TypeScript, Tailwind CSS, y manejo de APIs externas.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Características técnicas implementadas:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
              <li>App Router de Next.js 14</li>
              <li>TypeScript para type safety</li>
              <li>Debounce en búsqueda (300ms)</li>
              <li>localStorage para favoritos</li>
              <li>Manejo de estados: loading, error, empty</li>
              <li>Responsive design con Tailwind CSS</li>
            </ul>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm pt-4 border-t">
          <p>© 2025 Weather App - Proyecto Académico EIA</p>
        </footer>
      </div>
    </div>
  );
}
