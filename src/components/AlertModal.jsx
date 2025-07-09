import React, { useEffect, useState } from "react";

const AlertModal = ({ open, type = "info", message, onClose, duration = 5000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (open) {
      setProgress(100);

      // Countdown for progress bar
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            onClose();
            return 0;
          }
          return prev - 100 / (duration / 100);
        });
      }, 100);

      // Auto close after duration
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  const typeStyles = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700",
    info: "bg-blue-100 border border-blue-400 text-blue-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`bg-white rounded-lg p-6 max-w-md w-full text-center shadow-lg ${typeStyles[type]}`}
      >
        <div className="text-lg font-bold mb-2  capitalize">{type}</div>
        <div className="text-gray-700 mb-4">{message}</div>
        <div className="mt-3 w-full bg-gray-300 rounded-full overflow-hidden h-1">
          <div
            className="h-full bg-black transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
