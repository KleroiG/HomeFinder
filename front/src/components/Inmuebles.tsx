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

export default function Inmuebles() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Función para obtener los inmuebles
  const obtenerInmuebles = async () => {
    try {
      const response = await fetch("http://localhost:4173/api/inmuebles");
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      
      // Filtramos los inmuebles que tienen disponibilidad como true
      const inmueblesDisponibles = data.filter((inmueble: Inmueble) => inmueble.disponibilidad);

      // Seleccionamos 20 inmuebles aleatorios
      const inmueblesAleatorios = obtenerAleatorios(inmueblesDisponibles, 20);

      setInmuebles(inmueblesAleatorios); // Asignamos los inmuebles aleatorios
    } catch (err) {
      setError("Error al obtener los productos");
      console.error(err);
    }
  };

  // Función para seleccionar elementos aleatorios de un array
  const obtenerAleatorios = (array: Inmueble[], cantidad: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Barajamos el array
    return shuffled.slice(0, cantidad); // Retornamos los primeros 'cantidad' elementos
  };

  useEffect(() => {
    obtenerInmuebles();
  }, []);

  const manejarClick = (id: number) => {
    navigate(`/inmueble/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Inmuebles</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {inmuebles.map((inmueble) => (
            <a key={inmueble.id} href="#" className="group" onClick={() => manejarClick(inmueble.id)}>
              <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 xl:h-72">
                <img
                  alt={inmueble.titulo}
                  src={inmueble.imagen_url}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-300">{inmueble.titulo}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">$ {Number(inmueble.precio).toLocaleString()} COP / noche</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{inmueble.ubicacion}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
