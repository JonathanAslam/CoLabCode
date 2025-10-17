import React from 'react'
import PropTypes from 'prop-types'
import './NavbarButton.css'
import { FaUserLarge } from "react-icons/fa6";


const NavbarButton = ({ text, asLink = false }) => {
  return (
    <div className="navbar-button">
      {asLink ? (
        <span>{text}</span>
      ) : (
        <a href="/">{text}</a>
      )}
    </div>
  )
}

NavbarButton.propTypes = {
  text: PropTypes.string.isRequired,
  asLink: PropTypes.bool,
}

export default NavbarButton