import React from 'react'
import './HomePage.css'
import Cube from '../../components/Cube'


const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className='background-effect'>
        <Cube/>
      </div>
      <div className="homepage-text-container">
        <h1>Welcome to the Home Page</h1>
      </div>

    </div>
  )
}

export default HomePage
