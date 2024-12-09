import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBed, FaBath, FaUser, FaHouseUser, FaMapMarkerAlt, FaMap   } from "react-icons/fa";
const PropertyDetail = () => {
  const { id } = useParams(); 
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [fechaLlegada, setFechaLlegada] = useState<string>("");
  const [fechaSalida, setFechaSalida] = useState<string>("");
  const [guests] = useState<number>(1); 
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false); 
  const [confirmationAction, setConfirmationAction] = useState<() => void>(() => () => {}); 
  const [hasReservation, setHasReservation] = useState<boolean>(false); // Estado para verificar si ya hay una reserva


  const obtenerInmueble = async () => {
    try {
      const response = await fetch(`http://localhost:4173/api/inmuebles/${id}`, {
      });
      if (!response.ok) {
        throw new Error('Error al obtener el inmueble');
      }
      const data = await response.json();
      setProperty(data);
    } catch (err) {
      setError('Error al obtener los detalles del inmueble');
      console.error(err);
    }
  };

  const verificarReserva = async () => {
    const usuario_id = localStorage.getItem('userId');
  
    if (!usuario_id) {
      console.log('No se encontró el usuario_id en localStorage.');
      return false;
    }
  
    try {
      const response = await fetch(`http://localhost:4173/api/reservations?usuario_id=${usuario_id}&inmueble_id=${id}`);
      const data = await response.json();
  
      if (response.ok) {
        // Verifica si existe una reserva en el array devuelto
        const hasReservation = data.some(
          (reserva: { usuario_id: string; inmueble_id: string }) =>
            reserva.usuario_id === usuario_id && reserva.inmueble_id === id
        );
  
        setHasReservation(hasReservation);
        return hasReservation;
      } else {
        console.error('Error en la respuesta del servidor:', data.error || 'Error desconocido');
        return false;
      }
    } catch (err) {
      console.error('Error al realizar la solicitud:', err);
      return false;
    }
  };
  
  
  const handleFechaLlegadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFecha = e.target.value;
    setFechaLlegada(nuevaFecha);

    // Validar que la fecha de llegada no sea anterior a la fecha actual
    const today = new Date().toISOString().split("T")[0]; // Obtener la fecha actual
    if (nuevaFecha < today) {
      alert("La fecha de llegada no puede ser anterior a la fecha actual.");
      setFechaLlegada(today);
    }
  };

  const handleFechaSalidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaFecha = e.target.value;
    setFechaSalida(nuevaFecha);

    // Validar que la fecha de salida sea posterior a la fecha de llegada
    if (nuevaFecha <= fechaLlegada) {
      alert("La fecha de salida debe ser posterior a la fecha de llegada.");
      setFechaSalida("");
    }
  };

  const crearReserva = async () => {
    // Verifica si el usuario está logueado
    const usuario_id = localStorage.getItem('userId');
    if (!usuario_id) {
      alert('Para reservar, debes iniciar sesión primero.');
      return; // Esto debería evitar que el flujo continúe y cree una reserva.
    }
  
    
  
    if (guests <= 0 || guests > property.maxHuespedes) {
      alert('El número de huéspedes no es válido.');
      return;
    }
  
    // Mostrar la confirmación antes de crear la reserva
    setShowConfirmation(true);
    setConfirmationAction(() => handleConfirmarReserva);
  };

  const handleConfirmarReserva = async () => {
    // Obtener usuario_id del localStorage
    const usuario_id = localStorage.getItem('userId');

    if (!usuario_id) {
      alert('No has iniciado sesión');
      return;
    }

    // Crear la reserva
    try {
      const response = await fetch('http://localhost:4173/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id,
          inmueble_id: property.id,
          fecha_inicio: fechaLlegada,
          fecha_fin: fechaSalida,
          estado: true, // Reserva activa
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la reserva');
      }

      alert('Reserva creada exitosamente!');
      setShowConfirmation(false); // Cerrar el modal de confirmación
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      alert('Hubo un error al crear la reserva.');
    }
  };

  const handleCancelarReserva = () => {
    setShowConfirmation(false); // Cerrar el modal sin crear la reserva
  };
  const cambiarDisponibilidad = async (id: number, disponibilidadActual: boolean) => {
    try {
      console.log("Enviando solicitud para cambiar disponibilidad...");
      console.log("ID:", id, "Disponibilidad actual:", disponibilidadActual);
  
      const response = await fetch(`http://localhost:4173/api/inmuebles/disponibilidad/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ disponibilidad: !disponibilidadActual }),
      });
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
  
      if (!response.ok) {
        throw new Error(data.error || "Error desconocido");
      }
  
      setProperty((prevProperty: any) => ({
        ...prevProperty,
        disponibilidad: data.disponibilidad,
      }));
    } catch (error) {
      console.error("Error al cambiar la disponibilidad:", error);
      alert("Hubo un error al cambiar la disponibilidad del inmueble.");
    }
  };


  const extractDetails = (descripcion: string) => {
    const regex = /(\d+)\s*(huéspedes|huésped|huespedes|huesped|habitacion|habitaciones|habitación|camas|cama|baños|baño)/g;
    const matches = {
      maxHuespedes: 0,
      habitaciones: 0,
      camas: 0,
      banos: 0
    };

    const found = descripcion.match(regex);
    if (found) {
        found.forEach((item) => {
          const match = item.match(/\d+/);  // Buscar el número dentro de cada coincidencia
          if (match) {
            const number = parseInt(match[0]);
            if (item.includes('huéspedes') || item.includes('huésped')|| item.includes('huespedes') || item.includes('huesped')) {
              matches.maxHuespedes = number;
            } else if (item.includes('habitaciones') || item.includes('habitación')|| item.includes('habitacion')) {
              matches.habitaciones = number;
            } else if (item.includes('camas') || item.includes('cama')) {
              matches.camas = number;
            } else if (item.includes('baños') || item.includes('baño')) {
              matches.banos = number;
            }
          }
        });
      }
      return matches;
    };
    const extractDescription = (descripcion: string) => {
        const regex = /\d+/; // Encuentra el primer número en la descripción
        const firstNumberIndex = descripcion.search(regex); // Obtiene el índice del primer número
        
        if (firstNumberIndex !== -1) {
          return descripcion.substring(0, firstNumberIndex).trim(); // Elimina todo después del primer número
        }
      
        return descripcion; // Si no hay números, devuelve la descripción original
      };
    const details = property ? extractDetails(property.descripcion) : { maxHuespedes: 0, camas: 0, banos: 0, habitaciones: 0 ,};
    const descriptionClean = property ? extractDescription(property.descripcion) : "";
  useEffect(() => {
    if (id) {
      obtenerInmueble();
      verificarReserva();
      
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>Cargando...</p>;
  }

  return (
    <div  className="dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 bg-white dark:bg-gray-900 dark:text-white transition duration-300">
        {/* Encabezado */}
        <h1 className="text-2xl font-bold mb-4">{property.titulo}</h1>

        {/* Contenedor principal */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen principal */}
          <div className="w-full h-[600px] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
            <img
                alt={property.titulo}
                src={property.imagen_url}
                className="w-full h-full object-cover group-hover:opacity-75"
            />
            </div>
          
          {/* Panel de reserva */}
          
          <div className="md:w-2/5 bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
          <div className="text-lg font-semibold mb-2">
            $ {Number(property.precio).toLocaleString()} COP / noche
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <br />
            <div className="flex space-x-2 w-full">
            <span>Llegada: </span>
              <input
                type="date"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded px-2 py-1 text-sm w-full mb-2"
                value={fechaLlegada}
                onChange={handleFechaLlegadaChange}
                min={new Date().toISOString().split("T")[0]} // Limitar fechas pasadas
              />
              <span>Salida: </span>
              <input
                type="date"
                className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded px-2 py-1 text-sm w-full mb-2"
                value={fechaSalida}
                onChange={handleFechaSalidaChange}
                min={fechaLlegada} // La fecha de salida debe ser posterior a la de llegada
              />
                    </div>
                    <br />
                <span>Huéspedes: </span>
                <select className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded px-2 py-1 text-sm w-full">
                    {Array.from({ length: details.maxHuespedes }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1} huésped{index === 0 ? '' : 's'}
                    </option>
                    ))}
                </select>
                </div>
                <br />
                <button
              onClick={crearReserva}
              disabled={hasReservation} // Deshabilitar si ya hay reserva
              className={`w-full py-2 rounded-md font-semibold ${
                hasReservation
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600 transition'
              }`}
            >
              {hasReservation ? 'Ya has reservado este inmueble' : 'Reservar'}
            </button>

                {localStorage.getItem("userId") === property.propietario_id && (
                <>
                    <hr className="my-4 mt-5" />
                    <h3 className="text-medium font-semibold mb-1 ">Deseas realizar algun cambio?</h3>
                {//<button className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold ">
                        //Editar Propiedad
                    //</button>
                  }
                    
                    <h3 className="text-sm font-semibold mb-1 mt-10">Cambiar Visibilidad del inmueble:</h3>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => cambiarDisponibilidad(property.id, property.disponibilidad)}
                            className={`w-full bg-blue-500 text-white py-2 rounded-md font-semibold  ${
                            property.disponibilidad ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {property.disponibilidad ? "Marcar como No Disponible" : "Marcar como Disponible"}
                        </button>
                        </div>
                </>
                )}
          </div>
        </div>        
        <h1 className="mt-10 text-5 mb-4">{descriptionClean}</h1>
        <div className="dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 bg-white dark:bg-gray-900 dark:text-white transition duration-300">
        
          {/* Comodidades */}
        <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Comodidades</h3>
          <div className="flex space-x-6">
            <div className="flex items-center">
              <FaUser className="text-gray-500 dark:text-gray-400" />
              <span className="ml-2">{details.maxHuespedes} huéspedes</span>
            </div>
            <div className="flex items-center">
              <FaBed className="text-gray-500 dark:text-gray-400" />
              <span className="ml-2">{details.camas} camas</span>
            </div>
            <div className="flex items-center">
              <FaBath className="text-gray-500 dark:text-gray-400" />
              <span className="ml-2">{details.banos} baño{details.banos === 1 ? '' : 's'}</span>
            </div>
            <div className="flex items-center">
              <FaHouseUser  className="text-gray-500 dark:text-gray-400" />
              <span className="ml-2">{details.habitaciones} habitación{details.habitaciones === 1 ? '' : 'es'}</span>
            </div>
          </div>
        </div>
        
        {/* Ubicación con mapa */}
        <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
          <div className="flex space-x-6">
            {/* Icono de ubicación */}
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
              <span className="ml-2">{property.ubicacion}</span>
            </div>

            {/* Icono de dirección */}
            <div className="flex items-center">
              <FaMap className="text-gray-500 dark:text-gray-400" />
              <span className="ml-2">{property.direccion}</span>
            </div>
          </div>
        </div>
      </div>
    </div>


        {/* Sección de Reseñas */}
        <div className="mt-16 border-t border-gray-300 dark:border-gray-700 pt-8">
          <h2 className="text-xl font-bold mb-6">Reseñas</h2>
          {/* Reseñas aquí */}
        </div>
        
                 {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirmar Reserva</h2>
            <p className="mb-4">¿Estás seguro de que quieres crear esta reserva?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelarReserva}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={confirmationAction}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}



      </div>
    </div>
  );
};

export default PropertyDetail;


