import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { UserType } from '../App';

interface LoginProps {
  setUserType: (type: UserType) => void;
  passwords: {
    admin: string;
    normal: string;
  };
}

const Login: React.FC<LoginProps> = ({ setUserType, passwords }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === passwords.admin) {
      setUserType('admin');
      navigate('/selection');
    } else if (password === passwords.normal) {
      setUserType('normal');
      navigate('/selection');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f3e8]">
      <h1 className="text-3xl font-bold mb-8 text-center">Bienvenido al Columbario</h1>
      <div className="space-y-6 w-96">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Ingresar la contraseña de usuario:
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contraseña"
                />
                <Lock className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#8B4513] text-white py-2 px-4 rounded-md hover:bg-[#A0522D] transition duration-300"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;