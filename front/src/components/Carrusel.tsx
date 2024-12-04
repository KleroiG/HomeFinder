import React, { useEffect, useState } from 'react';

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Definir el tipo explícitamente
  const totalItems: number = 7; // Asegurar tipo explícito para el total de elementos

  const images: string[] = [
    'https://a0.muscache.com/im/pictures/2aae9259-4a19-47c8-a7ba-6f146e226db6.jpg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTA5NDg4Mzc1ODU5NTgzOTI0/original/8e02189d-ce78-44ad-89b6-512d0495c6a5.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/62b5a055-f0e2-419f-83df-c2763de8072f.jpg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-914724374839458428/original/57c1c921-6924-4e75-b843-66be8ad98679.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/airflow/Hosting-23503570/original/38b46256-132f-4f4b-962d-8e74f4281cd0.jpg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1152921373932104911/original/9634d01f-8d96-4b7f-9976-0a9f744811e3.jpeg?im_w=960&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-51542327/original/b1d26da4-7d24-4c0d-a6a3-80985f45e7d8.jpeg?im_w=720&im_format=avif',
  ];

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const goToPrev = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 4000); // Cambia de imagen cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="carousel" className="relative w-full max-w-3xl mx-auto">
      {/* Carousel wrapper */}
      <div className="relative overflow-hidden rounded-lg w-full h-96">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Indicators */}
      <div className="absolute z-30 flex space-x-2 bottom-5 left-1/2 -translate-x-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      {/* Controls */}
      <button
        type="button"
        onClick={goToPrev}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        onClick={goToNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60">
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
