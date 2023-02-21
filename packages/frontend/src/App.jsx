import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AttesterPage from './pages/AttesterPage'
import UserPage from './pages/UserPage'
import EpochKeyPage from './pages/EpochKeyPage'
import NotFound from './pages/NotFound'
import './app.css'

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="attester/:id" element={<AttesterPage />} />
      <Route path="user/:id" element={<UserPage />} />
      <Route path="epochKey/:id" element={<EpochKeyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
