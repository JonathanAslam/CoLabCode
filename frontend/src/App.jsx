import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Homepage from './pages/homepage/HomePage'
import Dashboard from './pages/dashboard/Dashboard'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Document from './pages/document/Document'

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
        <Route path='/document/:documentId' element={<Document />}></Route>
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
