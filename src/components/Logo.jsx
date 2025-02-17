import React from 'react'
import logo from '../assets/booster_logo_2__2___1_-removebg-preview.png'

const Logo = () => {
  return (
    // <BiLogoGraphql className='cursor-pointer text-4xl text-white'/> 
    <div>
        <img src={logo} alt="" className='cursor-pointer w-[60%] md:w-[70%] text-white'/>
    </div>
  )
}

export default Logo
