import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Recupera el estado del modo oscuro desde localStorage
    return localStorage.getItem("darkMode") === "true";
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Sincroniza el estado del modo oscuro con el elemento raíz <html>
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Almacena el estado en localStorage
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setIsAnimating(true); // Inicia la animación
    setDarkMode((prev) => !prev); // Alterna el estado

    setTimeout(() => {
      setIsAnimating(false); // Detiene la animación después de 2 segundos
    }, 1000);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed top-20 left-4 z-50 p-3 rounded-full shadow-md transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-yellow-400"
          : "bg-yellow-400 text-gray-800"
      } hover:scale-110`}
    >
      {isAnimating ? (
        darkMode ? (
          <MoonIcon className="h-6 w-6 animate-spin" />
        ) : (
          <SunIcon className="h-6 w-6 animate-spin" />
        )
      ) : darkMode ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default DarkModeToggle;
