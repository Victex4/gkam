import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'

const LogOutPopUp = ({ logOutPopUp, setLogOutPopUp }) => {
  return (
     <>
    {
      logOutPopUp && (
          <div className="popup">
              <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm ">
                  <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-md rounded-[25px] duration-200 w-[440px] lg:w-[600px]'>
                  {/* header */}
                  <div className='flex justify-end'>
                    <RxCross2 onClick={() => setLogOutPopUp(false)} className='text-blue-600 text-3xl cursor-pointer rounded-md hover:outline-none hover:ring-2 hover:ring-gray-200 hover:scale-105 duration-100'/>
                  </div>
                  <div className='pt-8'>
                      <IoIosLogOut className='items-center text-green-600 text-4xl text-center mx-auto'/>
                  </div>
                  <div className='flex items-center justify-between'>
                      <div className='text-center mx-auto'>
                          <h1 className='text-center mx-auto font-Poppins font-semibold'>Log Out</h1>
                      </div>
                      
                  </div>
                  {/* form Section */}
                  <div className='mt-2'>
                      <p className='font-Poppins mx-auto text-center text-sm text-gray-500 w-[40%]'>Do you wish to logout</p>
                  </div>
                      <div className='items-center mt-4 justify-center flex mb-12'>
                          <button onClick={() => {
                            localStorage.clear()
                            window.location.href = '/login'
                        }}  className='bg-red-600 py-1 px-12 text-white rounded-[5px] justify-center flex font-Poppins' >
                              Log Out
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )
    }
  </>
  )
}

export default LogOutPopUp
