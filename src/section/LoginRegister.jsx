import React from 'react'
import Button from '../components/Button'

const LoginRegister = () => {
  return (
    <section className='bg-[#FFE9FE]'>
      <div className='container flex flex-col justify-center'>
        <div className='pb-6 pt-5 md:py-6 md:text-[20px] text-[15px] flex justify-center'>
            <Button variant='outline'>
                Create an Account
            </Button>
        </div>
        <div className='flex md:text-[20px] text-[15px] justify-center pb-9'>
            <Button>
                Login
            </Button>
        </div>
      </div>
    </section>
  )
}

export default LoginRegister
