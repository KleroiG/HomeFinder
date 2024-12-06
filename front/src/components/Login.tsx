import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Example() {
  const [nombre, setUsername] = useState("");
  const [contrasena, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!nombre || !contrasena) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud al backend
      const response = await fetch("http://localhost:4173/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, contrasena})
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Inicio de sesión exitoso
      setError(""); // Limpiar errores
      localStorage.setItem("userId", data.id); 
      localStorage.setItem("token", data.token); 
      navigate("/"); 
      window.location.reload();
    } catch (err: unknown) {
      // Manejo de errores
      setError(
        err instanceof Error ? err.message : "Error desconocido al iniciar sesión."
      );
    }
  };

  return (
    <div className="dark:bg-gray-800 p-12">
      <div className="w-full max-w-md p-8 m-auto bg-white rounded-lg shadow-md dark:bg-gray-900">
        <div className="flex justify-center mx-auto mb-6">
          <img
            className="w-auto h-10 sm:h-12"
            src="https://merakiui.com/images/logo.svg"
            alt="logo"
          />
        </div>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nombre"
              className="block text-base text-gray-800 dark:text-gray-200"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-6 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contrasena"
                className="block text-base text-gray-800 dark:text-gray-200"
              >
                Contraseña
              </label>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Olvidaste la contraseña?
              </a>
            </div>
            <input
              type="contrasena"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-6 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-8 py-3 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p className="text-md mt-8 text-xs font-light text-center text-gray-400">
          No tienes una cuenta?{" "}
          <a
            href="./Register"
            className=" text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Crear una
          </a>
        </p>
      </div>
    </div>
  );
}
