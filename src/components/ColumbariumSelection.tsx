import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, LogOut, Search } from 'lucide-react';

const columbariums = [
  { id: 1, name: 'Columbario 1', image: 'https://i.imgur.com/v1vfxcx.png' },
  { id: 2, name: 'Columbario 2', image: 'https://becasbenitojuarezmx.com/wp-content/uploads/20230908-010612.jpg' },
  { id: 3, name: 'Columbario 3', image: 'https://i.imgur.com/rxPR1nm.png' },
  { id: 4, name: 'Columbario 4', image: 'https://i.imgur.com/wR1Gqzh.png' },
];

interface Person {
  id: string;
  name: string;
  columbarium: number;
  niche: number;
}

interface ColumbariumSelectionProps {
  setUserType: (type: null) => void;
  persons: Person[];
  userType: 'admin' | 'normal';
}

const ColumbariumSelection: React.FC<ColumbariumSelectionProps> = ({ setUserType, persons, userType }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredPersons);
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, persons]);

  const handleLogout = () => {
    setUserType(null);
    navigate('/');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (person: Person) => {
    navigate(`/person/${person.columbarium}/${person.niche}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f3e8]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 relative">
          <h1 className="text-3xl font-bold w-full text-center">Seleccione un Columbario</h1>
          <button
            onClick={handleLogout}
            className="absolute right-0 flex items-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          >
            <LogOut size={20} className="mr-2" />
            Cerrar sesión
          </button>
        </div>

        <div className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          {showSuggestions && searchResults.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
              {searchResults.map((person) => (
                <li
                  key={person.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(person)}
                >
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-gray-500">
                    Columbario {person.columbarium}, Cuadro {person.niche}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {columbariums.map((columbarium) => (
            <Link
              key={columbarium.id}
              to={`/columbarium/${columbarium.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
            >
              <img src={columbarium.image} alt={columbarium.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{columbarium.name}</h2>
                <div className="flex items-center text-gray-600">
                  <Grid size={20} className="mr-2" />
                  <span> Cuadros</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {userType === 'admin' && (
          <div className="flex justify-end mt-8">
            <Link
              to="/change-passwords"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Cambiar Contraseñas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumbariumSelection;