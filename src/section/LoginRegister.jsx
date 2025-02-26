import React from 'react'
import Button from '../components/Button'

const LoginRegister = () => {
  return (
    <section className='bg-[#FFE9FE]'>
      <div className='container flex flex-col justify-center py-[1rem]'>
        <div className='md:text-[20px] text-[15px] flex justify-center uppercase'>
            <Button variant='outline'>
                Create Your Account
            </Button>
        </div>
        <div className='flex gap-4 items-center justify-center py-4'>
        <hr className='my-3 border-1 w-11 border-black'/>
        OR
        <hr className='my-3 border-1 w-11 border-black'/>
        </div>
        <div className='flex md:text-[20px] text-[15px] justify-center pb-9'>
            <button className='bg-[#F36BF1] text-white/90 border-none hover:bg-[#EB10E8] px-[130px] rounded-full md:px-[150px] py-3 uppercase hover:scale-105 duration-100'>
                Login
            </button>
        </div>
      </div>
    </section>
  )
}

export default LoginRegister
