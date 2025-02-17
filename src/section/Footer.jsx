import React, { useState } from 'react'
import ContactUs from '../components/ContactUs';

const Footer = () => {
  const [contactUsPopUp, setContactUsPopUp] = useState(false);

  return (
    <footer className='bg-black/95' id='contact'>
      <div className='container p-4 flex justify-between'>
        <div className='flex gap-4'>
          <p className='text-white/35'>
              &copy; {new Date().getFullYear()} Glam Booster. All rights reserved.
          </p>
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
        <p className='text-white/35'>
          Victex Solutions
        </p>
      </div>
      {contactUsPopUp && (
        <ContactUs setContactUsPopUp={setContactUsPopUp}/> 
      )}
  </footer>
  )
}

export default Footer
