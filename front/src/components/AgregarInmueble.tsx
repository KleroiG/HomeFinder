import { PhotoIcon } from "@heroicons/react/24/solid"; // Para el icono de foto
import { MapIcon, SlashIcon } from "@heroicons/react/24/outline"; // Para los iconos de ubicación y precio
import { Link } from "react-router-dom";


export default function Example() {

  return (
    <div className="flex min-h-full items-center justify-center bg-white dark:bg-gray-800">
      <form className="w-full max-w-2xl space-y-6 p-6">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="mt-10 text-3xl font-semibold leading-7 text-gray-900 dark:text-white text-center">
            Acerca de tu Inmueble
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="name-inmueble" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Nombre del Inmueble
              </label>
              <div className="mt-2 flex items-center">
                
              <input
                  id="name-inmueble"
                  name="name-inmueble"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Correo electronico de contacto
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 dark:text-gray-400 sm:text-sm">
                    @gmail.com/
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label 
                htmlFor="ciudad" 
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Ciudad
              </label>
              <div className="mt-2">
                <select
                  id="ciudad"
                  name="ciudad"
                  autoComplete="country-name"
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
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Direccion del Inmueble
              </label>
              <div className="mt-2 flex items-center">
                <MapIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  placeholder="Ejemplo: Calle 123, Bogotá"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="cant-huespedes" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Cuantos huespedes se pueden hospedar
              </label>
              <div className="mt-2">
                <select
                  id="cant-huespedes"
                  name="cant-huespedes"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="precio"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Precio del Inmueble
              </label>
              <div className="flex items-center">
                <SlashIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" /> {/* Icono de Slash */}
                <input
                  id="precio"
                  name="precio"
                  type="number"
                  min="10000" // Valor mínimo 10,000
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
              name="about"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
            Escribe una breve descripcion de tu Inmueble
          </p>
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
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Solo se permiten imágenes .jpg .jpeg .png</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/step3"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Siguiente
          </Link>
        </div>
      </form>
    </div>
  );
};

