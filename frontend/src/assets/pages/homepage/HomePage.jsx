import React from 'react'
import './HomePage.css'
import Cube from '../../components/Cube'
import CustomButton from '../../components/customButton/CustomButton'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="homepage-container">
      <div className='background-effect'>
        <Cube/>
      </div>
      <div className="homepage-text-container">
        <h1>CoLabs</h1>
        <h3>Collaborate. Create. CoLab.</h3>
        <CustomButton label={"Learn more"}
        onClick={() => navigate('/Dashboard')}
        />
      </div>

    </div>
  )
}

export default HomePage
