import React from 'react'
import './HomePage.css'
import Cube from '../../components/Cube'
import CustomButton from '../../components/customButton/CustomButton'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    // button click animation handled in CustomButton component

    // smooth scroll to about page, need to render when button is clicked, not on hover


    navigate('/about');
  }

  
  return (
    <div className="homepage-container">
      <div className='background-effect'>
        <Cube/>
      </div>
      <div className="homepage-text-container">
        <h1 id='Title'>CoLabs</h1>
        <h3>Collaborate. Create. CoLab.</h3>
        <CustomButton label={"Learn more"}
        onClick={handleLearnMore}
        />
      </div>

    </div>
  )
}

export default HomePage
