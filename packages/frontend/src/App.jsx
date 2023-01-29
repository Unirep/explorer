import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AttesterPage from './pages/AttesterPage'
import UserPage from './pages/UserPage'
import NotFound from './pages/NotFound'
import './app.css'


export default function App() {
  return (
    <Routes>
    <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="attester/:id" element={<AttesterPage />} />
        <Route path="user/:id" element={<UserPage />} />
        <Route path='*' element={<NotFound />}/>
    </Route>
    </Routes>
  )
}