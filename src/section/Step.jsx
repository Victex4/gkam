import React from 'react'
import step from '../assets/stepimage2-removebg-preview.png'

const Step = () => {
  return (
    <section className='bg-[#FFE9FE]'>
      <div className='pt-[8rem] pb-[4rem]'>
        <div className='pb-[3rem]'>
            <p className='container text-3xl md:text-5xl font-semibold text-center '>Follow These Simple Steps to <span className='text-[#EB10E8]'>Get Started</span></p>
        </div>
        <div className='pt-[rem] flex flex-col md:flex-row justify-between items-center'>
            {/* StepImage section */}
            <div className='mask-gradient h-[350px] w-full overflow-hidden rounded-l-xl rounded-br-full border-l-[10px] border-blue-500 bg-[#EB10E8] md:h-[450px] md:w-[650px]'>
                <img src={step} className='md:w-[400px] w-[300px]' alt="" />
            </div>
            {/* StepContent section */}
            <div className='container md:w-[55%] w-[90%]'>
              <div 
              data-aos="fade-up"
              className='flex gap-6 pb-4'>
              <div>
                <h2 className='rounded-[50px] px-6 py-4 md:px-8 md:py-6 bg-[#EB10E8] text-white'>
                  1
                </h2>
              </div>
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-[18px] '>
                    Create an account 
                  </h2>
                  <p className='text-[15px]'>
                    Sign up for our Boost services in just one click! Simply hit the create account button and start using our services today
                  </p>
                </div>
              </div>
              <div 
              data-aos="fade-up"
              className='flex gap-6 py-4'>
              <div>
                <h2 className='rounded-[50px] px-6 py-4 md:px-8 md:py-6 bg-[#EB10E8] text-white'>
                  2
                </h2>
              </div>
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-[18px] '>
                    Choose a Social Platform
                  </h2>
                  <p className='text-[15px]'>
                    Pick Your Desired Service from the List and Place Your Order Instantly
                  </p>
                </div>
              </div>
              <div
              data-aos="fade-up"
              className='flex gap-6 py-4'>
              <div>
                <h2 className='rounded-[50px] px-6 py-4 md:px-8 md:py-6 bg-[#EB10E8] text-white'>
                  3
                </h2>
              </div>
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-[18px] '>
                    Enter Post Details
                  </h2>
                  <p className='text-[15px]'>
                    Provide the necessary details for your selected service and proceed to checkout
                  </p>
                </div>
              </div>
              <div 
              data-aos="fade-up"
              className='flex gap-6 py-4'>
              <div>
                <h2 className='rounded-[50px] px-6 py-4 md:px-8 md:py-6 bg-[#EB10E8] text-white'>
                  4
                </h2>
              </div>
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-[18px] '>
                    Make Payment
                  </h2>
                  <p className='text-[15px]'>
                    Complete your purchase securely and instantly process your order
                  </p>
                </div>
              </div>
              <div 
              data-aos="fade-up"
              className='flex gap-6 py-4'>
              <div>
                <h2 className='rounded-[50px] px-6 py-4 md:px-8 md:py-6 bg-[#EB10E8] text-white'>
                  5
                </h2>
              </div>
                <div className='flex flex-col'>
                  <h2 className='font-semibold text-[18px] '>
                    Track Your Order
                  </h2>
                  <p className='text-[15px]'>
                    Monitor the progress of your order in real-time from your dashboard
                  </p>
                </div>
              </div>
            </div>
            <div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Step
