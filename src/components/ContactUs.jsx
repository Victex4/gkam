import React from 'react'
import Button from './Button'

const ContactUs = ({setContactUsPopUp}) => {
  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm '>
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md duration-200 w-[200px] lg:w-[500px] rounded-2xl'>
            <div className='text-center'>
                <h1 className='text-2xl md:text-4xl font-semibold'>Contact Glam Booster</h1>
                <p className='text-sm font-semibold'>Please reach out to us via email </p>
                <a href=""></a>
            </div>
            <div className='md:text-end' onClick={() => setContactUsPopUp(false)}>
                <Button className='text-center '>
                    <button >
                        Ok
                    </button>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ContactUs
