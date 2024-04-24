/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage'
import LikeStatus from './Pages/LikeStatus/LikeStatus'
import UserProfile from './Pages/UserProfile/UserProfile'
import NotFound from './Pages/NotFound/NotFound'
import UserContext from './../src/Contexts/UserContext'

import './App.css'

function App() {
  const [user, setUser] = useState(null); // Inicializa el estado del usuario


  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage setUser={setUser}></LoginPage>}></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path='/like_status' element={<LikeStatus></LikeStatus>}></Route>
            <Route path='/user_profile' element={<UserProfile></UserProfile>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App;
