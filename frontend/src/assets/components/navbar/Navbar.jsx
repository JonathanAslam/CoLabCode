import React from 'react'
import './Navbar.css'
import Logo from '../logo/Logo'
import NavbarButton from './NavbarButton'
import { Link, useNavigate } from 'react-router-dom'

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
                            <Link to="/">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {/* Profile Area - right */}
                <div className="navbar-profile">
                    <Link to='/login'><NavbarButton text="Login" asLink={true}/></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
