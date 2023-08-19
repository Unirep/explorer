import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AttesterPage from './pages/AttesterPage'
import UpdateInfoPage from './pages/UpdateInfoPage'
import UserPage from './pages/UserPage'
import EpochKeyPage from './pages/EpochKeyPage'
import NotFound from './pages/NotFound'
import './app.css'
import './app-mobile.css'

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":network?" element={<Home />} />
      <Route path=":network/attester/:id" element={<AttesterPage />} />
      <Route path=":network/updateInfo/:id" element={<UpdateInfoPage />} />
      <Route path=":network/user/:id" element={<UserPage />} />
      <Route path=":network/epochKey/:id" element={<EpochKeyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
