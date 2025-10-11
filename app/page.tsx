"use client";
import { Suspense } from "react";
import { Cloud } from "lucide-react";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeContent />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Cloud size={48} className="text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800">
            Consulta el Clima
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Busca cualquier ciudad y obtén el pronóstico actualizado
        </p>
      </div>
      <div className="flex justify-center py-12">
        <div className="animate-pulse text-gray-400">Cargando...</div>
      </div>
    </div>
  );
}
