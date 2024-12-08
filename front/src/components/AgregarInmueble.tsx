import { PhotoIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Example() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    ubicacion: "Bogota",
    direccion: "",
    precio: "",
    imagen_url: "",
  });

  // Manejar cambios en el archivo de imagen (para URL de imagen)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Si el archivo es una imagen, convertirlo a URL (usando FileReader)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imagen_url: reader.result as string, // Esto convertirá el archivo a URL
        });
      };
      reader.readAsDataURL(e.target.files[0]); // Leer archivo como URL
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!formData.titulo || !formData.descripcion || !formData.ubicacion || !formData.precio || !formData.imagen_url || !formData.direccion) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Obtener el id del propietario desde el localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No se pudo obtener el ID del propietario.");
      return;
    }
    // Crear el objeto de datos a enviar
    const inmuebleData = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      ubicacion: formData.ubicacion,
      precio: formData.precio,
      imagen_url: formData.imagen_url,
      direccion: formData.direccion,
      propietario_id: userId,
      disponibilidad: true,
    };

    // Enviar los datos al backend
    try {
      const response = await fetch('http://localhost:4173/api/inmuebles', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inmuebleData),
      });

      if (response.ok) {
        // Notificar éxito
        alert("Inmueble creado correctamente!");

        // Vaciar los campos del formulario
        setFormData({
          titulo: '',
          descripcion: '',
          ubicacion: '',
          precio: '',
          imagen_url: '',
          direccion: ''
        });
      } else {
        alert("Error al crear inmueble.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Hubo un error al crear el inmueble.");
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-white dark:bg-gray-800">
      <form className="w-full max-w-2xl space-y-6 p-6" onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="mt-10 text-3xl font-semibold leading-7 text-gray-900 dark:text-white text-center">
            Acerca de tu Inmueble
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name-inmueble" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Nombre del Inmueble
              </label>
              <div className="mt-2 flex items-center">
                <input
                  id="name-inmueble"
                  name="titulo"
                  type="text"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="ciudad" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Ciudad
              </label>
              <div className="mt-2">
                <select
                  id="ciudad"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Bogota</option>
                  <option>Medellin</option>
                  <option>Cali</option>
                  <option>Barranquilla</option>
                  <option>Cartagena</option>
                  <option>Bucaramanga</option>
                  <option>Pereira</option>
                  <option>Santa Marta</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Direccion del Inmueble
              </label>
              <div className="mt-2 flex items-center">
                <input
                  id="street-address"
                  name="direccion"
                  type="text"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Ejemplo: Calle 123, Bogotá"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Precio del Inmueble
              </label>
              <div className="flex items-center">
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  min="10000"
                  value={formData.precio}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  placeholder="Precio mínimo 10,000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Describe tu Inmueble
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="descripcion"
              rows={3}
              value={formData.descripcion}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Escribe una breve descripcion de tu Inmueble"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Fotos del Inmueble
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-500" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Sube una foto</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Solo se permiten imágenes .jpg .jpeg .png</p>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="imagen_url" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              O ingresa la URL de la imagen
            </label>
            <input
              id="imagen_url"
              name="imagen_url"
              type="text"
              value={formData.imagen_url || ""}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Ingresa la URL de la imagen"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Crear Inmueble
          </button>
        </div>
      </form>
    </div>
  );
}
