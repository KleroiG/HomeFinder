import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import Select, { SingleValue } from 'react-select';

const SearchButton: React.FC = () => {
  const [city, setCity] = useState<SingleValue<{ value: string; label: string; }> | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);
  const [isFixed, setIsFixed] = useState(false);

  const cities = [
    { value: 'Bogotá', label: 'Bogotá' },
    { value: 'Medellín', label: 'Medellín' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Barranquilla', label: 'Barranquilla' },
    { value: 'Cartagena', label: 'Cartagena' },
    { value: 'Bucaramanga', label: 'Bucaramanga' },
    { value: 'Pereira', label: 'Pereira' },
    { value: 'Santa Marta', label: 'Santa Marta' },
  ];

  const handleSearch = () => {
    console.log('Searching for:', { city, startDate, endDate, guests });
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsFixed(offset > 100); // Cambia a fijo cuando se desplaza más de 100px
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg shadow-md w-7/10 mx-auto space-y-2 md:space-y-0 bg-gray-100 ${isFixed ? 'fixed top-[64px] left-0 w-full z-50' : 'relative'}`}>
      <div className={`w-full md:w-1/4`}>
        <Select
          value={city}
          onChange={(selectedCity) => setCity(selectedCity)}
          options={cities}
          className="basic-single"
          classNamePrefix="select"
          placeholder="Ciudad"
          isClearable
          styles={{
            control: (base) => ({
              ...base,
              minHeight: '30px',
              border: '1px solid #ccc',
              borderRadius: '0.375rem',
              width: '100%', // Asegura que el control tenga el mismo tamaño
            }),
          }}
        />
      </div>

      <div className={`flex space-x-2 w-full md:w-1/2 ${isFixed ? 'flex-wrap' : ''}`}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date || undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Inicio"
          className="border rounded-lg p-1 w-full flex-grow" // Asegura que ocupe espacio igual
          isClearable
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date || undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate ? startDate : undefined}
          placeholderText="Fin"
          className="border rounded-lg p-1 w-full flex-grow" // Asegura que ocupe espacio igual
          isClearable
        />
      </div>

      <div className={`relative w-full md:w-1/4`}>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
          min="1"
          className="border rounded-lg p-1 w-full text-center hover:bg-blue-100 transition duration-200"
          placeholder="Personas"
        />
        <span className="absolute right-1 top-1/2 transform -translate-y-1/2">
          <AiOutlineUser className="w-5 h-5" />
        </span>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-700 text-white rounded-full p-3 hover:bg-blue-800 flex items-center justify-center ml-4"
      >
        <FaSearch className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchButton;
