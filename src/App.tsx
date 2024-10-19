import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ColumbariumSelection from './components/ColumbariumSelection';
import Columbarium from './components/Columbarium';
import PersonDetails from './components/PersonDetails';
import ChangePasswords from './components/ChangePasswords';

export type UserType = 'admin' | 'normal' | null;

export interface Person {
  id: string;
  name: string;
  columbarium: number;
  niche: number;
  diaFallecimiento: string;
}

export interface Passwords {
  admin: string;
  normal: string;
}

function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [persons, setPersons] = useState<Person[]>([]);
  const [passwords, setPasswords] = useState<Passwords>({
    admin: 'Sanjosemaria14',
    normal: 'usuario123'
  });

  useEffect(() => {
    const storedPersons = localStorage.getItem('persons');
    if (storedPersons) {
      setPersons(JSON.parse(storedPersons));
    }
    const storedPasswords = localStorage.getItem('passwords');
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    }
  }, []);

  const addPerson = (person: Person) => {
    setPersons((prevPersons) => {
      const newPersons = [...prevPersons, person];
      localStorage.setItem('persons', JSON.stringify(newPersons));
      return newPersons;
    });
  };

  const updatePerson = (updatedPerson: Person) => {
    setPersons((prevPersons) => {
      const newPersons = prevPersons.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      );
      localStorage.setItem('persons', JSON.stringify(newPersons));
      return newPersons;
    });
  };

  const updatePasswords = (newPasswords: Passwords) => {
    setPasswords(newPasswords);
    localStorage.setItem('passwords', JSON.stringify(newPasswords));
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#f5f3e8]">
        <Routes>
          <Route path="/" element={<Login setUserType={setUserType} passwords={passwords} />} />
          <Route
            path="/selection"
            element={
              userType ? (
                <ColumbariumSelection setUserType={setUserType} persons={persons} userType={userType} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/columbarium/:id"
            element={
              userType ? (
                <Columbarium userType={userType} persons={persons} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/person/:columbarium/:niche"
            element={
              userType ? (
                <PersonDetails
                  userType={userType}
                  persons={persons}
                  addPerson={addPerson}
                  updatePerson={updatePerson}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/change-passwords"
            element={
              userType === 'admin' ? (
                <ChangePasswords passwords={passwords} updatePasswords={updatePasswords} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;