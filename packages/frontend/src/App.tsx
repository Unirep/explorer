import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Attester from './pages/Attester'
import User from './pages/User'
import './app.css'


export default function App() {
  return (
    <Routes>
    <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="attester/:id" element={<Attester />} />
        <Route path="user/:id" element={<User />} />
    </Route>
    </Routes>
  )
}