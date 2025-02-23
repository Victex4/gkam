import React from 'react'
import Button from '../components/Button'

const Login = ({ handleLoginPopUp, handleAccPopUp }) => {
  return (
    <section className='bg-[#FFE9FE]'>
      <div className='container flex gap-4 items-center py-8 md:py-[2rem] justify-center'>
        <div  data-aos="fade-up animate-bounce-up" >
          <p className="md:px-20 animate-bounce-up px-10 py-4 bg-white md:py-8 rounded-2xl md:text-2xl font-semibold" >
            30,000+ <span>Orders</span>
          </p>
        </div>
        {/* <hr className='border-t-2 border-black/80 text-center' style={{ width: '10%', margin: '0 auto'}} /> */}
        <div  data-aos="fade-up" >
          <p className="md:px-20 px-10 py-4 animate-bounce-up bg-white md:py-8 rounded-2xl md:text-2xl font-semibold" >
            10,000+ <span>Users</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
