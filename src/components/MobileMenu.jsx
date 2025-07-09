import React from 'react'
import Logo from './Logo'
import Button from './Button'

const MobileMenu = ({setMenuOpen, menuItems, menuOpen}) => {
  return (
    <div className={`fixed left-0 top-0 z-30 h-full w-3/4 transform border-r-2 border-white/15 bg-white/90 px-4 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className='mt-5 w-[40%]'>
        <Logo />
      </div>
      <hr className='my-3 border-2 border-white/5'/>
        <ul className='mt-5 flex-col flex space-y-3 mb-5 pl-0'>
            {
                menuItems.map((item)=> (
                    <li key={item.href}>
                        <a href={item.href} className='nav-item p-2 no-underline'>{item.label}</a>
                    </li>
                ))
            }
        </ul>
        <button className='rounded-full px-8 py-2 uppercase bg-transparent text-[#EB10E8] border-2 border-[#EB10E8] hover:bg-[#EB10E8] hover:text-white'>
           Register
        </button>
    </div>
  )
}

export default MobileMenu
