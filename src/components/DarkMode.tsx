import React, { useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Añadimos o removemos la clase 'dark' al elemento raíz <html>
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
    >
      {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
};

export default DarkModeToggle;
