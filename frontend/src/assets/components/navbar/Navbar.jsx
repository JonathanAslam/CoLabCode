import React from 'react'
import './Navbar.css'
import Logo from '../logo/Logo'
import NavbarButton from './NavbarButton'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className='navbar-content'>
                {/* Site Logo - left */}
                <div className="navbar-logo">
                    <Logo />
                </div>
                {/* Page links - middle */}
                <div className='navbar-list-container'>
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="navbar-item">
                            <a href="/">Dashboard</a>
                        </li>
                        <li className="navbar-item">
                            <a href="/">About</a>
                        </li>
                    </ul>
                </div>
                {/* Profile Area - right */}
                <div className="navbar-profile">
                    <NavbarButton text="Login" />
                </div>
            </div>
        </div>
    )
}

export default Navbar
