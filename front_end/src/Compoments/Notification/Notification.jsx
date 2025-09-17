import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Notification = ({ type = "success", message, onClose }) => {
  // Tự động đóng sau 2.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 flex flex-col items-center animate-zoomIn">
        {type === "success" ? (
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        ) : (
          <FaTimesCircle className="text-red-500 text-6xl mb-4" />
        )}
        <p className="text-lg font-medium text-gray-700 text-center">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
