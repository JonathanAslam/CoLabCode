import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './assets/components/navbar/Navbar'
import Homepage from './assets/pages/homepage/HomePage'
import Dashboard from './assets/pages/dashboard/Dashboard'
import About from './assets/pages/about/About'
import Login from './assets/pages/login/Login'

function App() {
  return (

      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}></Route> 
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>

  )
}

export default App
