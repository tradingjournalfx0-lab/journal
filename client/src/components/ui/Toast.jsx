import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
}) {

  useEffect(() => {

    const timer = setTimeout(() => {

      onClose();

    }, 3000);

    return () =>
      clearTimeout(timer);

  }, [onClose]);

  return (

    <div
      className={`fixed top-5 right-5 px-6 py-4 rounded-2xl shadow-lg z-50 ${
        type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      }`}>

      {message}

    </div>

  );
}