import { useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoutes from './components/ProtectedRoutes'
import Nav from './components/Nav'
import './App.css'
import Supplier from './components/Supplier'
import Movement from './components/Movement'
import Payment from './components/Payment'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoutes />} >
        <Route path='/' element={<Dashboard />} />
        <Route path='/supplier' element={<Supplier />} />
        <Route path='/movement' element={<Movement />} />
        <Route path='/payment' element={<Payment />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
