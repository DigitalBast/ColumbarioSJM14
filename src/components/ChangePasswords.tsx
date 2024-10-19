import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

interface ChangePasswordsProps {
  passwords: {
    admin: string;
    normal: string;
  };
  updatePasswords: (newPasswords: { admin: string; normal: string }) => void;
}

const ChangePasswords: React.FC<ChangePasswordsProps> = ({ passwords, updatePasswords }) => {
  const [newAdminPassword, setNewAdminPassword] = useState(passwords.admin);
  const [newNormalPassword, setNewNormalPassword] = useState(passwords.normal);
  const [showPasswords, setShowPasswords] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePasswords({
      admin: newAdminPassword,
      normal: newNormalPassword,
    });
    alert('Contraseñas actualizadas con éxito');
    navigate('/selection');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Cambiar Contraseñas</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña de Administrador
          </label>
          <div className="relative">
            <input
              type={showPasswords ? 'text' : 'password'}
              id="adminPassword"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="normalPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña de Usuario Normal
          </label>
          <div className="relative">
            <input
              type={showPasswords ? 'text' : 'password'}
              id="normalPassword"
              value={newNormalPassword}
              onChange={(e) => setNewNormalPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            {showPasswords ? (
              <>
                <EyeOff size={20} className="mr-2" />
                Ocultar contraseñas
              </>
            ) : (
              <>
                <Eye size={20} className="mr-2" />
                Mostrar contraseñas
              </>
            )}
          </button>
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
            onClick={() => navigate('/selection')}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswords;