import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define la interfaz para los inmuebles
interface Inmueble {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  precio: string;
  imagen_url: string;
  disponibilidad: boolean;
}

export default function MisReservaciones() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const manejarClick = (id: number) => {
    navigate(`/inmueble/${id}`);
  };

  // Función para obtener los inmuebles reservados por el usuario
  const obtenerInmuebles = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Obtener el ID del usuario
      if (!userId) {
        setError("No se pudo obtener el ID del usuario.");
        return;
      }

      // Realizamos una solicitud para obtener los inmuebles con reservas del usuario
      const response = await fetch(`http://localhost:4173/api/reservations/user/${userId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los inmuebles con reservas");
      }

      const data = await response.json();
      
      if (data.message) {
        setMensaje(data.message); // Si no hay reservas, mostramos el mensaje
      } else {
        setInmuebles(data); // Asignamos los inmuebles con reservas
      }
    } catch (err) {
      setError("Error al obtener los inmuebles con reservas");
      console.error(err);
    }
  };

  useEffect(() => {
    obtenerInmuebles();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Cabecera */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mis Reservaciones</h1>
        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        {error && <p className="text-red-500">{error}</p>}
        {mensaje && <p className="text-gray-500">{mensaje}</p>} {/* Mostrar el mensaje si no hay reservas */}

        {/* Lista de inmuebles */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {inmuebles.map((inmueble) => (
            <a key={inmueble.id} href="#" className="group" onClick={() => manejarClick(inmueble.id)}>
              <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 xl:h-72">
                <img
                  alt={inmueble.titulo}
                  src={inmueble.imagen_url}
                  className={`h-full w-full object-cover object-center group-hover:opacity-75 ${!inmueble.disponibilidad ? 'grayscale-[80%] brightness-[15%]' : ''}`}
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-300">{inmueble.titulo}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
                {inmueble.precio}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{inmueble.ubicacion}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
