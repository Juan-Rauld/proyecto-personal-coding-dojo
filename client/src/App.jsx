/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import HomePage from './Pages/HomePage/HomePage'
import LikeStatus from './Pages/LikeStatus/LikeStatus'
import UserProfile from './Pages/UserProfile/UserProfile'
import NotFound from './Pages/NotFound/NotFound'

import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path='/like_status' element={<LikeStatus></LikeStatus>}></Route>
          <Route path='/user_profile' element={<UserProfile></UserProfile>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
