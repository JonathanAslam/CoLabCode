import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Logo from '../logo/Logo'
import NavbarButton from './NavbarButton'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // useEffect to fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchResult = await api.get('/api/users/profile', {
                    withCredentials: true,
                });
                if (fetchResult) {
                    setUser(fetchResult.data);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    const handleSignOut = async () => {
        try {
            await api.post('/api/users/logout');
            setUser(null);
            alert('Logged out successfully!');
            navigate('/login');   // Switch to login view
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Error logging out. Please try again.');
        }
    }

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
                            {/* only show dashboard option for logged in users */}
                            {user && 
                            <li className="navbar-item">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            }
                            <li className="navbar-item">
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                    {/* Profile Area - right */}
                    <div className="navbar-profile">
                        {user ? (
                            <>
                                <span id='profile-welcome'>Welcome, {user.username}</span>
                                <NavbarButton text='Logout' asLink={true} onClick={handleSignOut}/>
                            </>
                        ) : (
                            <Link className='navbar-login-link' to='/login'><NavbarButton text="Login" asLink={true} /></Link>
                        )}
                    </div>
                </div>
            </div>
        )
    }

export default Navbar
