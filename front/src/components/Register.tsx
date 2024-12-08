import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Maneja los cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validaciones y envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
  
    // Validar que los campos no estén vacíos
    if (!username || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }
    // Verificar que la contraseña coincida
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
  
    // Validar que el correo sea válido
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('Correo electrónico no válido.');
      return;
    }
  
    setError(''); // Limpiar error
  
    try {
      const response = await fetch('http://localhost:4173/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Asegúrate de que la cabecera esté correcta
        },
        body: JSON.stringify(formData), // Asegúrate de que los datos se serialicen correctamente
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert('Usuario creado exitosamente');
        window.location.href = "/login";
      } else {
        setError(data.message || 'Hubo un error al registrar el usuario.');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión al servidor.');
    }
  };

  return (
    <div className="dark:bg-gray-800 p-8">
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Crear una cuenta</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Correo Electronico:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
            Registrarse
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">Ya tienes una cuenta? </span>
          <a href="./Login" className="text-blue-500 hover:text-blue-600">Iniciar Sesion</a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
