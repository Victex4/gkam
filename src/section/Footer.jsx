import React, { useState } from 'react'

const Footer = () => {
  const [contactUsPopUp, setContactUsPopUp] = useState(false);

  return (
    <footer className='bg-black/95' id='contact'>
      <div className='p-4 flex justify-between'>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <div>
            <p className='text-white/35 text-[11px] md:text-[16px]'>
                &copy; {new Date().getFullYear()} Glam Booster. All rights reserved.
            </p>
          </div>
          <div className='flex gap-4 text-[11px] md:text-[16px]'>
            <p className='text-white/35'>
              |
            </p>
            <button className='text-[#EB10E8] font-semibold' onClick={() => setContactUsPopUp(true)}>
              Contact Us 
            </button>
            <p className='text-white/35'>
              |
            </p>
            <p className='text-[#EB10E8] font-semibold'>
              Privacy Policy
            </p>
          </div>
        </div>
        <p className='text-white/35 text-[11px] md:text-[16px]'>
          Victex Solutions
        </p>
      </div>
      {/* {contactUsPopUp && (
        <ContactUs setContactUsPopUp={setContactUsPopUp}/> 
      )} */}
  </footer>
  )
}

export default Footer
