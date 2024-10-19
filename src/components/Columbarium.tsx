import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserType, Person } from '../App';

interface ColumbariumProps {
  userType: UserType;
  persons: Person[];
}

const columbariumImages = [
  'https://i.imgur.com/v1vfxcx.png',
  'https://becasbenitojuarezmx.com/wp-content/uploads/20230908-010612.jpg',
  'https://i.imgur.com/rxPR1nm.png',
  'https://i.imgur.com/wR1Gqzh.png',
];

const Columbarium: React.FC<ColumbariumProps> = ({ userType, persons }) => {
  const { id } = useParams<{ id: string }>();
  const columbariumId = parseInt(id || '1') - 1;
  const backgroundImage = columbariumImages[columbariumId];

  const renderNiche = (number: number) => {
    const person = persons.find(p => p.columbarium === parseInt(id || '0') && p.niche === number);
    const bgColor = person ? 'bg-transparent' : 'bg-[#4d4d4d] bg-opacity-75';

    return (
      <Link
        key={number}
        to={`/person/${id}/${number}`}
        className={`${bgColor} border border-gray-300 flex items-center justify-center aspect-square transition duration-300 hover:bg-gray-100 hover:bg-opacity-50`}
      >
        <span className="text-xs font-semibold text-white">{number}</span>
      </Link>
    );
  };

  const renderGrid = () => {
    if (id === '1') {
      return (
        <div className="grid grid-cols-12 gap-0">
          {Array.from({ length: 84 }, (_, i) => renderNiche(i + 1))}
        </div>
      );
    } 
    if (id === '2') {
      return (
        <div className="grid grid-cols-5 gap-0">
          {Array.from({ length: 25 }, (_, i) => renderNiche(i + 1))}
        </div>
      );
    }
    if (id === '3') {
      return (
        <div className="grid grid-cols-8 gap-0">
          {Array.from({ length: 56 }, (_, i) => renderNiche(i + 1))}
        </div>
      );
    } 
    if (id === '4') {
      return (
        <div className="grid gap-0" style={{ gridTemplateColumns: 'repeat(14, minmax(50px, 1fr))' }}>
          {Array.from({ length: 98 }, (_, i) => renderNiche(i + 1))}
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Columbario {id}</h1>
        <Link
          to="/selection"
          className="absolute top-0 right-0 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Volver a la selección
        </Link>
      </div>
      <div 
        className="relative bg-cover bg-center"
        style={{ 
        backgroundImage: `url(${backgroundImage})`,
        maxWidth: id === '1' ? '1000px' : id === '2' ? '400px' : id === '3' ? '600px' : id === '4' ? '1000px' : 'Other-Values',
        margin: '0 auto',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10">
          {renderGrid()}
        </div>
      </div>
    </div>
  );
};

export default Columbarium;
