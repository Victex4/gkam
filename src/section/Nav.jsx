import React from 'react'
import { menuItems } from '../constants'
import Button from '../components/Button'
import { BiX } from 'react-icons/bi'
import { BiMenuAltRight } from 'react-icons/bi'
import MobileMenu from '../components/MobileMenu'
import Logo from '../components/Logo'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Header = ({menuOpen, setMenuOpen}) => {
  const logoVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const menuVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: "easeOut"
      },
    },
  };

  const menuItemVariants = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.header className='fixed top-0 z-10 w-full px-4 py-4'
      initial="hidden"
      animate="visible"
      >
        <nav className='container flex items-center justify-between rounded-full border-2 text-gray-700 border-white/10 bg-white/55 shadow-md'>
            <motion.div className='flex items-center'
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            >
                <Logo />
            </motion.div>
            <motion.ul className='hidden space-x-4 md:flex text-gray-700'
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            >
                {
                    menuItems.map((item)=> (
                        <motion.li key={item.href} className=' hover:scale-100 text-gray-700 duration-150 no-underline rounded-lg hover:text-white/90 p-2' variants={menuItemVariants}>
                            <a href={item.href} className='nav-item no-underline'>{item.label}</a>
                        </motion.li>
                    ))
                }
            </motion.ul>
            <motion.div className='hidden md:block'
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            >
              <Link to="/register">
                <div>
                  <button className='rounded-full px-8 py-2 uppercase bg-transparent text-[#EB10E8] border-2 border-[#EB10E8] hover:bg-[#EB10E8] hover:scale-100 duration-150'>
                    Register
                  </button>
                </div> 
              </Link>
            </motion.div>

            <motion.button className='text-4xl text-gray-500 md:hidden' 
            onClick={()=> setMenuOpen(!menuOpen)}
            aria-label='Toggle Menu'
            aria-expanded={menuOpen}
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            >
                {menuOpen ? <BiX /> : <BiMenuAltRight /> }
            </motion.button>
        </nav>
      </motion.header>

      {/* overlay moblie menu  */}
      {
        menuOpen && (
            <div className='fixed inset-0 z-10 bg-black opacity-50'
              onClick={()=> setMenuOpen(false)}
              aria-label='Close Menu'
              aria-expanded={menuOpen}
            />
        )
      }

      {/* Moblie Menu  */}
      <MobileMenu 
      menuOpen={menuOpen} 
      setMenuOpen={setMenuOpen}
      menuItems={menuItems}
      /> 
    </>
  )
}

export default Header
