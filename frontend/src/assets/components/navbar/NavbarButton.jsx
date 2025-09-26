import React from 'react'
import './NavbarButton.css'

const NavbarButton = ({ text }) => {
  return (
    <div className="navbar-button">
      <a href="/">{text}</a>
    </div>
  )
}

export default NavbarButton