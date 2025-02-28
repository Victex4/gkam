import React, { useState } from 'react'

const Footer = () => {
  const [contactUsPopUp, setContactUsPopUp] = useState(false);

  return (
    <footer className='bg-black/95' id='contact'>
      <div className='py-4 px-2 flex justify-between'>
        <div className='flex gap-4'>
          <div>
            <p className='text-white/35 text-[11px] md:text-[16px]'>
                &copy; {new Date().getFullYear()} Glam Booster. All rights reserved.
            </p>
          </div>
          <div className='text-[11px] md:text-[16px]'>
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
