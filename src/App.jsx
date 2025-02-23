import React, { useState } from 'react'
import AOS from 'aos'
import "aos/dist/aos.css"
import Nav from './section/Nav'
import Hero from './section/Hero'
import Footer from './section/Footer'
import Services from './section/Services'
import Login from './section/User'
import Register from './Register'
import LoginRegister from './section/LoginRegister'
import Icons from './section/Icons'
import Step from './section/Step'
import Contact from './section/Contact'

const App = () => {
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
    <div className={`${darkMode && "dark"} bg-white dark:bg-gray-900 dark:text-white duration-200`}>
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/> 
      <Hero menuOpen={menuOpen}/>
      <LoginRegister />
      <Login handleAccPopUp={handleAccPopUp} handleLoginPopUp={handleLoginPopUp}/>
      <Icons />
      <Step />
      <Services />
      <Contact />
      <Footer />
      <Register loginPopUp={loginPopUp} setLoginPopUp={setLoginPopUp}/>
    </div>
  )
}

export default App
