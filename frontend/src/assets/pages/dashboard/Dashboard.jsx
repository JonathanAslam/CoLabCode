import React from 'react'
import './Dashboard.css'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        <h1>Dashboard Page</h1>

        <h3>Temp link to document</h3>
        <Link to="/document">Open Document</Link>
    </div>
  )
}

export default Dashboard
