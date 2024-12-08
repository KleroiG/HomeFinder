import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";

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
  const [city, setCity] = useState<SingleValue<{ value: string; label: string }>>(null); // Estado para la ciudad seleccionada
  const navigate = useNavigate();

  // Lista de ciudades para el filtro
  const cities = [
    { value: 'Bogota', label: 'Bogota' },
    { value: 'Medellin', label: 'Medellin' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Barranquilla', label: 'Barranquilla' },
    { value: 'Cartagena', label: 'Cartagena' },
    { value: 'Bucaramanga', label: 'Bucaramanga' },
    { value: 'Pereira', label: 'Pereira' },
    { value: 'Santa Marta', label: 'Santa Marta' },
  ];

  // Función para obtener los inmuebles
  const obtenerInmuebles = async () => {
    try {
      const response = await fetch("http://localhost:4173/api/inmuebles");
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();

      // Filtramos los inmuebles que tienen disponibilidad y coinciden con la ciudad seleccionada
      const inmueblesDisponibles = data.filter((inmueble: Inmueble) => 
        inmueble.disponibilidad && 
        (!city || inmueble.ubicacion.toLowerCase() === city.value.toLowerCase())
      );

      setInmuebles(inmueblesDisponibles); // Asignamos solo los inmuebles disponibles
    } catch (err) {
      setError("Error al obtener los productos");
      console.error(err);
    }
  };

  useEffect(() => {
    obtenerInmuebles();
  }, [city]); // Dependencia de ciudad para actualizar los inmuebles cuando se selecciona una nueva ciudad

  const manejarClick = (id: number) => {
    navigate(`/inmueble/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Descubre Nuestros Inmuebles</h2>
        <hr className="my-4 mt-5" />
        {error && <p className="text-red-500">{error}</p>}

        {/* Selector de Ciudad */}
        <Select
  value={city}
  onChange={(selectedCity) => setCity(selectedCity)}
  options={cities}
  className="basic-single dark:text-gray-950 dark:bg-gray-800 dark:border-gray-600 mt-10"
  classNamePrefix="select"
  placeholder="Selecciona una ciudad"
  isClearable
  styles={{
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2d3748', // Fondo más oscuro para el panel
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#1a202c', // Fondo más oscuro para el control
      color: state.isFocused || city ? '#ffffff' : '#cbd5e0', // Texto blanco cuando está seleccionado
      borderColor: state.isFocused || city ? '#4a5568' : '#2d3748', // Bordes más claros cuando está enfocado
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff', // Asegura que el texto del valor seleccionado sea blanco
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4a5568' : state.isFocused ? '#2d3748' : undefined, // Opciones más oscuras
      color: state.isSelected || state.isFocused ? '#ffffff' : '#cbd5e0', // Texto blanco cuando seleccionado o enfocado
    }),
  }}
/>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-10">
          {inmuebles.length === 0 ? (
            <p>No se encontraron inmuebles disponibles.</p>
          ) : (
            inmuebles.map((inmueble) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
