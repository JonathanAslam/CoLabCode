import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './assets/components/navbar/Navbar'
import Homepage from './assets/pages/homepage/HomePage'
import Dashboard from './assets/pages/dashboard/Dashboard'
import About from './assets/pages/about/About'
import Login from './assets/pages/login/login'
import Document from './assets/pages/document/Document'


function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/document' element={<Document />}></Route>
      </Routes>
    </>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>

  );
}

export default App
