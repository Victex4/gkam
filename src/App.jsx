import React, { useState } from 'react'
import AOS from 'aos'
import "aos/dist/aos.css"
import Nav from './section/Nav'
import Hero from './section/Hero'
import Footer from './section/Footer'
import Services from './section/Services'
import Login from './section/User'
import LoginRegister from './section/log/LoginRegister'
import Icons from './section/Icons'
import Step from './section/Step'
import Contact from './section/Contact'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginMenu from './LoginMenu'
import LandingPage from './section/LandingPage'
import Register from './LoginModal'
import Dashboard from './section/Dashboard'
import Affiliate from './components/task/Affiliate'
import AccountModal from './components/modals/AccountModal'
import AffliateModal from './components/modals/AffliateModal'
import ApiModal from './components/modals/ApiModal'
import OrderModal from './components/modals/OrderModal'
import PrivacyModal from './components/modals/PrivacyModal'
import ServicesModal from './components/modals/ServicesModal'
import Support from './components/modals/Support'
import AddFunds from './components/modals/AddFunds'
import ProceedPayment from './components/modals/ProceedPayment'
import PaymentHis from './components/modals/PaymentHis'
import TaskCenter from './components/modals/TaskCenter'
import LogOutPopUp from './components/modals/LogOutPopUp'
import ForgotPassword from './components/ForgotPassword'
import VerifyEmail from './section/VerifyEmail'
// import SignUp from './SignUp'
// import LoginModal from './LoginModal'

const App = () => {
  const [loginPopUp, setLoginPopUp] = React.useState(false)
  const [accPopUp, setAccPopUp] = React.useState(false)
  const [menuOpen, setMenuOpen] = useState()
  const [isSideBarOpen, setIssideBarOpen] = useState(false);
  const [logOutPopUp, setLogOutPopUp] = useState(false);
  
  
  const handleLogOutPopUp = () => {
    setLogOutPopUp(!logOutPopUp);
  };
  

   const toggleSideBar = () => {
        setIssideBarOpen(!isSideBarOpen);
      };


  const handleLoginPopUp = () => {
    setLoginPopUp(!loginPopUp)
  }

  const handleAccPopUp = () => {
    setAccPopUp(!accPopUp)
  }

 
  
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
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/" element={<LoginRegister />} />
          <Route path="/login" element={<LoginMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/account' element={<AccountModal  toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/task' element={<AffliateModal toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/api' element={<ApiModal toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/order' element={<OrderModal toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/Privacy' element={<PrivacyModal toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/service' element={<ServicesModal toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/addfunds' element={<AddFunds toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/proceed' element={<ProceedPayment toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/history' element={<PaymentHis toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path='/taskcenter' element={<TaskCenter toggleSideBar={toggleSideBar} isSideBarOpen={isSideBarOpen}/>}/>
          <Route path="/verify-email" element={<VerifyEmail />} />

        </Routes>
      </div>
    </Router>
    <LogOutPopUp
          setLogOutPopUp={setLogOutPopUp}
          logOutPopUp={logOutPopUp}
        />
    </div>
  )
}

export default App
