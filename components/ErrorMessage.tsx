import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-3">
      <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
      <div>
        <h3 className="text-red-800 font-semibold mb-1">Error</h3>
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
}
