import React from 'react'
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ForgotPassPopUp = ({forgotPassPopUp, setForgotPassPopUp}) => {
    const navigate = useNavigate()
  return (
<div>
    {
        forgotPassPopUp && (
            <div className="popup">
              <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-sm ">
                  <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md rounded-[25px] duration-200 w-[440px] lg:w-[600px]'>
                  {/* header */}
                  <div className='pt-8'>
                    <h2 className='text-blue-600 font-Poppins text-2xl pb-6 text-center font-semibold'>Email Has Been Sent</h2>
                      <MdEmail  className='items-center text-[#028855] bg-[#EBFFFF] px-4 py-4 rounded-full text-8xl text-center mx-auto'/>
                  </div>
                  <div className='flex items-center justify-between'>
                      <div className='text-center mx-auto'>
                          <h1 className='text-center mx-auto font-Poppins font-semibold'>Saved!</h1>
                      </div>
                      
                  </div>
                  {/* form Section */}
                  <div className='mt-3'>
                    <h3 className='font-Poppins text-gray-950 pb-1 font-semibold text-center'>Check Your Email For Code</h3>
                      <p className='font-Poppins mx-auto text-center text-sm text-gray-500 w-[40%]'>We've Sent a Code To Your Email Address</p>
                  </div>
                      <div className='items-center mt-4 justify-center flex mb-12' onClick={() => setForgotPassPopUp(false)}>
                          <button className='bg-blue-600 py-1 px-12 text-white rounded-[5px] justify-center flex font-Poppins' onClick={() => navigate('recover-password')}>
                              Continue
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
    </div>
  )
}

export default ForgotPassPopUp
