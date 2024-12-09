import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 w-full ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../icons/icono.png"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              HomeFinder
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/Team" className="hover:underline me-4 md:me-6">
                Acerca de nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Terminos y Privacidad
              </a>
            </li>
            <li>
              <a href="/Team" className="hover:underline">
                Contactanos
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{' '}
          <a href="https://flowbite.com/" className="hover:underline">
            HomeFinder™ .
          </a>
            Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
