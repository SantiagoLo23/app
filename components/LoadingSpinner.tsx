import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
      <p className="text-gray-600 text-lg">Cargando...</p>
    </div>
  );
}
