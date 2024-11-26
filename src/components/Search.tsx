import React, { useState } from 'react';
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



  return (
<div className={`flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg w-7/10 mx-auto space-y-2 md:space-y-0 bg-gray-100 dark:bg-gray-800 `}>
  <div className={`w-full md:w-1/4`}>
    <Select
      value={city}
      onChange={(selectedCity) => setCity(selectedCity)}
      options={cities}
      className="basic-single dark:text-gray-950 dark:bg-gray-900 dark:border-gray-700"
      classNamePrefix="select"
      placeholder="Ciudad"
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          minHeight: '30px',
          width: '100%',
          backgroundColor: 'bg-gray-900',
          color: '#0000', 
          
        }),
        
      }}
    />
  </div>

      <div className={`flex space-x-2 w-full md:w-1/2 `}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date || undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Inicio"
          className=" rounded-lg p-1 w-full flex-grow dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700"
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
          className="border rounded-lg p-1 w-full flex-grow dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700" 
          isClearable
        />
      </div>

      <div className={`relative w-full md:w-1/4`}>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
          min="1"
          className="border rounded-lg p-1 w-full text-center hover:bg-blue-100 transition duration-200 dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700"
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
