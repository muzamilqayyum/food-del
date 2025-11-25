import React from 'react'
import { assets } from '../../assets/assets.js'
import "./Navbar.css"

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <h1 className='logo'>Carla</h1>
        <img src={assets.profile_image} className='profile' alt="" />
      </div>
    </div>
  )
}

export default Navbar
