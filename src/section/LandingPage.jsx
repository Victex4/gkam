import React, { useState } from 'react'
import Header from './Nav'
import Hero from './Hero'
import Icons from './Icons'
import LoginRegister from './log/LoginRegister'
import Login from './User'
import Step from './Step'
import Services from './Services'
import Contact from './Contact'
import Footer from './Footer'
import AOS from 'aos'
import "aos/dist/aos.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginMenu from '../LoginMenu'
import Register from '../Register'


const LandingPage = () => {
     const [loginPopUp, setLoginPopUp] = React.useState(false)
      const [accPopUp, setAccPopUp] = React.useState(false)
      const [menuOpen, setMenuOpen] = useState()
    
    
      const handleLoginPopUp = () => {
        setLoginPopUp(!loginPopUp)
      }
    
      const handleAccPopUp = () => {
        setAccPopUp(!accPopUp)
      }
    
      const [darkMode, setDarkMode] = useState(false);
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
      
      React.useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh()
      }, []);
  return (
    <div>
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Hero menuOpen={menuOpen} />
        <Icons />
        <Login />
        <LoginRegister />
        <Routes>
          <Route path="/login" element={<LoginMenu />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* Shared layout: Bottom sections */}
        <Step />
        <Services />
        <Contact />
        <Footer />
    </div>
  )
}

export default LandingPage
