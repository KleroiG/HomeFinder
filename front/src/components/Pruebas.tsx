import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchButton: React.FC = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);

  const handleSearch = () => {
    // Aquí puedes manejar la lógica de búsqueda
    console.log('Searching for:', { location, startDate, endDate, guests });
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-md">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Lugar"
        className="border rounded-lg p-2 mb-2"
      />

      <div className="flex mb-2">
        <div className="relative w-1/2 mr-2">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date || undefined)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Día de inicio"
            className="border rounded-lg p-2 w-full"
            isClearable
          />
        </div>
        <div className="relative w-1/2 ml-2">
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date || undefined)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate ? startDate : undefined}
            placeholderText="Día de salida"
            className="border rounded-lg p-2 w-full"
            isClearable
          />
        </div>
      </div>

      <div className="flex mb-2">
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min="1"
          className="border rounded-lg p-2 w-full"
          placeholder="Número de personas"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-700 text-white rounded-lg p-2 hover:bg-blue-800"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchButton;
