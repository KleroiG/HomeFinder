import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSortAsc , GoSortDesc  } from "react-icons/go";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("usuarios"); // Estado para la sección activa
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [data, setData] = useState<any[]>([]); // Datos de la tabla
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null); 
  const [modalVisible, setModalVisible] = useState(false);

  // Función para obtener los datos desde el backend

  useEffect(() => {
    fetchData(); // Cargar los datos al cambiar de sección
  }, [activeSection]);
  
const fetchData = async () => {
  let endpoint = "";

  switch (activeSection) {
    case "usuarios":
      endpoint = "http://localhost:4173/api/users";
      break;
    case "inmuebles":
      endpoint = "http://localhost:4173/api/inmuebles";
      break;
    case "reservas":
      endpoint = "http://localhost:4173/api/reservations";
      break;
    default:
      return;
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setData(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  const sortData = (field: string) => {
    const sortedData = [...data].sort((a, b) => {
      // Convertir los valores a números si son del tipo id
      const aValue = typeof a[field] === "string" && !isNaN(Number(a[field])) ? Number(a[field]) : a[field];
      const bValue = typeof b[field] === "string" && !isNaN(Number(b[field])) ? Number(b[field]) : b[field];
  
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };
  // Función para manejar la búsqueda
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      if (activeSection === "usuarios") {
        return item.id.toString().includes(searchTerm);
      } else if (activeSection === "inmuebles") {
        return (
          item.id.toString().includes(searchTerm) ||
          item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (activeSection === "reservas") {
        return item.id.toString().includes(searchTerm);
      }
      return false;
    });
    setFilteredData(filtered); // Actualiza el estado de los datos filtrados
  };


  useEffect(() => {
    // Después de la búsqueda, actualizar los datos visibles
    handleSearch();
  }, [searchTerm, data]);



  const handleDelete = async (id: number) => {
    let endpoint = "";
    switch (activeSection) {
      case "usuarios":
        endpoint = `http://localhost:4173/api/users/${id}`;
        break;
      case "inmuebles":
        endpoint = `http://localhost:4173/api/inmuebles/${id}`;
        break;
      case "reservas":
        endpoint = `http://localhost:4173/api/reservations/${id}`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error("Error deleting item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!editingItem) return;

    let endpoint = "";
    switch (activeSection) {
      case "usuarios":
        endpoint = `http://localhost:4173/api/users/${editingItem.id}`;
        break;
      case "inmuebles":
        endpoint = `http://localhost:4173/api/inmuebles/${editingItem.id}`;
        break;
      case "reservas":
        endpoint = `http://localhost:4173/api/reservations/${editingItem.id}`;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editingItem),
      });

      if (response.ok) {
        fetchData();
        closeEditModal();
      } else {
        console.error("Error updating item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const goToHome = () => {
    navigate("/");
  };

  // Función para truncar la contraseña
  const truncatePassword = (password: string) => {
    return password ? `${password.slice(0, 4)}****` : "N/A";
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Barra de navegación superior */}
      <div className="bg-white dark:bg-gray-800 shadow w-full p-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="../icons/icono.png"
            alt="Logo"
            className="w-12 h-18 mr-2 hidden md:flex"
          />
          <h2 className="font-bold text-xl hidden md:flex dark:text-gray-100">
            HomeFinder
          </h2>
        </div>
      </div>
      <div className="flex-1 flex">
        {/* Barra lateral */}
        <aside className="p-2 bg-white dark:bg-gray-800 w-60 hidden md:flex flex-col ">
          <nav>
            <button
              className={`block py-2.5 px-4 my-4 rounded ${activeSection === "usuarios" ? "bg-gradient-to-r from-cyan-400 to-cyan-300 text-white" : "text-gray-500 dark:text-gray-300"}`}
              onClick={() => setActiveSection("usuarios")}
            >
              Usuarios
            </button>
            <button
              className={`block py-2.5 px-4 my-4 rounded ${activeSection === "inmuebles" ? "bg-gradient-to-r from-cyan-400 to-cyan-300 text-white" : "text-gray-500 dark:text-gray-300"}`}
              onClick={() => setActiveSection("inmuebles")}
            >
              Inmuebles
            </button>
            <button
              className={`block py-2.5 px-4 my-4 rounded ${activeSection === "reservas" ? "bg-gradient-to-r from-cyan-400 to-cyan-300 text-white" : "text-gray-500 dark:text-gray-300"}`}
              onClick={() => setActiveSection("reservas")}
            >
              Reservaciones
            </button>
          </nav>
          <button
            onClick={goToHome}
            className="block text-gray-500 dark:text-gray-300 py-2.5 px-4 my-2 rounded hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white cursor-pointer mt-auto"
          >
            Volver al inicio
          </button>
          <button
            onClick={handleLogout}
            className="block text-gray-500 dark:text-gray-300 py-2.5 px-4 my-2 rounded hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-white cursor-pointer"
          >
            Cerrar sesión
          </button>
        </aside>
        {/* Área principal */}
        <main className="flex-1 p-4">
          <div className="relative max-w-md mb-4">
            <input
              className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 dark:placeholder-gray-400 border rounded-full focus:shadow-outline dark:bg-gray-800 dark:text-gray-100"
              type="search"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="absolute top-1 right-2 text-gray-400 dark:text-gray-300"
            >
              <i className="fas fa-search"></i>
            </button>
            <div className="absolute top-3 right-5 flex space-x-2">
              <button onClick={() => { sortData('id'); toggleSortDirection(); }}>
                {sortDirection === "asc" ? <GoSortDesc  /> : <GoSortAsc />}
              </button>
            </div>
          </div>
          <table className="table-auto w-full bg-white dark:bg-gray-800 rounded-md">
            <thead>
              <tr className="text-left bg-gray-200 dark:bg-gray-700">
                {activeSection === "usuarios" && (
                  <>
                    <th className="px-4 py-2 w-1/12">ID</th>
                    <th className="px-4 py-2 w-1/12">Nombre</th>
                    <th className="px-4 py-2 w-1/12">Correo</th>
                    <th className="px-4 py-2 w-1/12">Contraseña</th>
                    <th className="px-4 py-2 w-1/12">Administrador</th>
                    <th className="px-4 py-2 w-1/12">Fecha Creacion</th>
                  </>
                )}
                {activeSection === "inmuebles" && (
                  <>
                    <th className="px-4 py-2 w-1/12">ID</th>
                    <th className="px-4 py-2 w-1/12">PropietarioID</th>
                    <th className="px-6 py-2 w-1/12">Titulo</th>
                    <th className="px-6 py-2 w-1/12 max-w-xs truncate">Descripcion</th>
                    <th className="px-4 py-2 w-1/12">Ubicación</th>
                    <th className="px-4 py-2 w-1/12">Fecha Creacion</th>
                    <th className="px-4 py-2 w-1/12">Precio</th>
                    <th className="px-4 py-2 w-1/12">Disponibilidad</th>
                    <th className="px-4 py-2 w-1/12">Imagen</th>
                    <th className="px-4 py-2 w-1/12">Direccion</th>
                  </>
                )}
                {activeSection === "reservas" && (
                  <>
                    <th className="px-4 py-2 w-1/12">ID</th>
                    <th className="px-4 py-2 w-1/12">Usuario ID</th>
                    <th className="px-4 py-2 w-1/12">Inmueble ID</th>
                    <th className="px-4 py-2 w-1/12">Fecha inicio</th>
                    <th className="px-4 py-2 w-1/12">Fecha fin</th>
                    <th className="px-4 py-2 w-1/12">Fecha Creacion</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
            {(filteredData.length > 0 ? filteredData : data).map((item: any) => (
                <tr key={item.id} className="text-gray-700 dark:text-gray-300">
                    {activeSection === "usuarios" && (
                    <>
                        <td className="px-4 py-2">{item.id}</td>
                        <td className="px-4 py-2">{item.nombre}</td>
                        <td className="px-4 py-2">{item.correo_electronico}</td>
                        <td className="px-4 py-2">{truncatePassword(item.contrasena)}</td>
                        <td className="px-4 py-2">{item.admin ? "Sí" : "No"}</td>
                        <td className="px-4 py-2">{item.creado_en}</td>
                    </>
                    )}
                    {activeSection === "inmuebles" && (
                    <>
                        <td className="px-4 py-2">{item.id}</td>
                        <td className="px-4 py-2">{item.propietario_id}</td>
                        <td className="px-6 py-2">{item.titulo}</td>
                        <td className="px-6 py-2 max-w-xs truncate">{item.descripcion}</td>
                        <td className="px-4 py-2">{item.ubicacion}</td>
                        <td className="px-4 py-2">{item.creado_en}</td>
                        <td className="px-4 py-2">{item.precio}</td>
                        <td className="px-4 py-2">{item.disponibilidad ? "Disponible" : "No disponible"}</td>
                        <td className="px-4 py-2">
                        <img src={item.imagen_url} alt="Imagen" className="w-12 h-12 object-cover" />
                        </td>
                        <td className="px-4 py-2">{item.direccion}</td>
                    </>
                    )}
                    {activeSection === "reservas" && (
                    <>
                        <td className="px-4 py-2">{item.id}</td>
                        <td className="px-4 py-2">{item.usuario_id}</td>
                        <td className="px-4 py-2">{item.inmueble_id}</td>
                        <td className="px-4 py-2">{item.fecha_inicio}</td>
                        <td className="px-4 py-2">{item.fecha_fin}</td>
                        <td className="px-4 py-2">{item.creado_en}</td>
                    </>
                    )}
                    <td className="px-4 py-2 flex gap-2">
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleEditSubmit()}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDelete(item.id)}
                    >
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))}

                </tbody>
            </table>
        </main>
        {modalVisible && (
            <div className="modal">
            <button onClick={handleEditSubmit}>Guardar</button>
            <button onClick={closeEditModal}>Cancelar</button>
            </div>
            )}
      </div>
    </div>
  );
};

export default Dashboard;
