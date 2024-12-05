import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Inicio", href: "/", current: true },
  { name: "Inmuebles", href: "/Inmuebles", current: false },
];

function classNames(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un token JWT en localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Si el token está presente, el usuario está autenticado
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token al cerrar sesión
    setIsAuthenticated(false); // Cambiar el estado a no autenticado
    navigate("/"); // Redirigir a la página de inicio
  };

  return (
    <>
      {/* Menú fijo con z-index y espacio reservado */}
      <Disclosure as="nav" className="bg-gray-900 w-full fixed top-0 left-0 z-50 shadow-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8"
                    alt="Flowbite Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                    HomeFinder
                  </span>
                </a>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Cuenta</span>
                    <img alt="" src="./icons/usuario.png" className="h-8 w-8 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {isAuthenticated ? (
                    <>
                      <MenuItem>
                        <Link
                          to="/agregarInmueble"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Agregar Nuevos Inmuebles
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/mis-inmuebles"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mis Inmuebles
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/mis-reservaciones"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mis Reservaciones
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          Salir
                        </button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <Link
                          to="/Register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Registrarse
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/Login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Iniciar Sesión
                        </Link>
                      </MenuItem>
                    </>
                  )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>

      {/* Espaciador para el contenido debajo */}
      <div className="pt-16"></div>
    </>
  );
}
