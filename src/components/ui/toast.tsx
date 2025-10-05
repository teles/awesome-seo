import * as React from "react"
import { CheckCircle2, X } from "lucide-react"
import { cn } from "../../lib/utils"

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700",
        "flex items-center gap-3 px-4 py-3 min-w-[300px]",
        "animate-slide-in-from-bottom-5"
      )}
    >
      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 flex-1">
        {message}
      </p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string }>;
  onRemoveToast: (id: string) => void;
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </>
  );
}
