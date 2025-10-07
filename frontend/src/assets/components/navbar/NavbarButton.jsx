import React from 'react'
import './NavbarButton.css'
import { FaUserLarge } from "react-icons/fa6";


const NavbarButton = ({ text }) => {
  return (
    <div className="navbar-button">
      <FaUserLarge color='white'/>
      <a href="/">{text}</a>
    </div>
  )
}

export default NavbarButton