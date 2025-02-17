import React from 'react'
import Button from '../components/Button'

const Login = ({ handleLoginPopUp, handleAccPopUp }) => {
  return (
    <section className='container bg-[#FFE9FE] flex gap-4 items-center pt-8 md:pt-0 justify-center'>
       <div  data-aos="fade-up animate-bounce-up" >
        <p className="px-20 animate-bounce-up bg-white py-8 rounded-2xl text-2xl font-semibold" >
          30,000+ <span>Orders</span>
        </p>
      </div>
      {/* <hr className='border-t-2 border-black/80 text-center' style={{ width: '10%', margin: '0 auto'}} /> */}
      <div  data-aos="fade-up" >
        <p className="px-20 animate-bounce-up bg-white py-8 rounded-2xl text-2xl font-semibold" >
          10,000+ <span>Users</span>
        </p>
      </div>
    </section>
  )
}

export default Login
