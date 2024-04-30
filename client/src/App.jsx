/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage'
import LikeStatus from './Pages/LikeStatus/LikeStatus'
import UserProfile from './Pages/UserProfile/UserProfile'
import NotFound from './Pages/NotFound/NotFound'
import UserContext from '../src/Contexts/UserContext'
import HeaderComponent from '../src/Components/Header/HeaderComp'

import './App.css'

function PrivateRoute({ children }) {
  const { user } = React.useContext(UserContext);

  // Verifica si el usuario está autenticado basándose en el estado del usuario y el token de autenticación en localStorage.
  const isAuthenticated = user || localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  /*   const [user, setUser] = useState(localStorage.getItem('user') || null);
   */

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    // Si no hay un token de autenticación en localStorage, establece el estado del usuario a ''.
    if (!localStorage.getItem('token')) {
      setUser('');
    }
    setAuthInitialized(true);
  }, []);


  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className='mb-8'>
          <HeaderComponent logout={logout} />
        </div>
        <div>
          {authInitialized && (
            <Routes>
              <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/like_status" element={<PrivateRoute><LikeStatus /></PrivateRoute>} />
              <Route path="/user_profile/:id" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;