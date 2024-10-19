import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserType, Person } from '../App';
import Comments from './Comments';
import PhotoAlbum from './PhotoAlbum';

interface PersonDetailsProps {
  userType: UserType;
  persons: Person[];
  addPerson: (person: Person) => void;
  updatePerson: (person: Person) => void;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ userType, persons, addPerson, updatePerson }) => {
  const { columbarium, niche } = useParams<{ columbarium: string; niche: string }>();
  const [personInfo, setPersonInfo] = useState<Person>({
    id: `${columbarium}-${niche}`,
    name: '',
    columbarium: parseInt(columbarium || '0'),
    niche: parseInt(niche || '0'),
    diaFallecimiento: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const existingPerson = persons.find(
      (p) => p.columbarium === parseInt(columbarium || '0') && p.niche === parseInt(niche || '0')
    );

    if (existingPerson) {
      setPersonInfo(existingPerson);
    } else {
      setPersonInfo({
        id: `${columbarium}-${niche}`,
        name: '',
        columbarium: parseInt(columbarium || '0'),
        niche: parseInt(niche || '0'),
        diaFallecimiento: '',
      });
    }
    setIsEditing(false);
  }, [columbarium, niche, persons]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (personInfo.name || personInfo.diaFallecimiento) {
      if (persons.some(p => p.id === personInfo.id)) {
        updatePerson(personInfo);
      } else {
        addPerson(personInfo);
      }
    }
    setIsEditing(false);
  };

  const handleDeleteInfo = () => {
    const updatedInfo = {
      ...personInfo,
      name: '',
      diaFallecimiento: '',
    };
    updatePerson(updatedInfo);
    setPersonInfo(updatedInfo);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute right-0">
          <Link
            to={`/columbarium/${columbarium}`}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Volver al Columbario
          </Link>
        </div>
        <h1 className="text-3xl font-bold w-full text-center">Detalles del Fallecido</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <p className="mb-4">
              <strong>Columbario:</strong> {columbarium}
            </p>
            <p className="mb-4">
              <strong>Número de Cuadro del Columbario:</strong> {niche}
            </p>
            {isEditing && userType === 'admin' ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={personInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="diaFallecimiento" className="block text-sm font-medium text-gray-700 mb-2">
                    Día de Fallecimiento
                  </label>
                  <input
                    type="date"
                    id="diaFallecimiento"
                    name="diaFallecimiento"
                    value={personInfo.diaFallecimiento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p className="mb-4">
                  <strong>Nombre Completo:</strong> {personInfo.name || 'No asignado'}
                </p>
                <p className="mb-4">
                  <strong>Día de Fallecimiento:</strong> {personInfo.diaFallecimiento || 'No asignado'}
                </p>
                {userType === 'admin' && (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-2"
                    >
                      Editar Información
                    </button>
                    <button
                      onClick={handleDeleteInfo}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Eliminar información
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <PhotoAlbum personId={personInfo.id} userType={userType} />
        </div>
        <div className="w-full md:w-1/2">
          <Comments personId={personInfo.id} userType={userType} />
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;