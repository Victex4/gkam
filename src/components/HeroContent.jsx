import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { ReactTyped } from "react-typed";

const HeroContent = ({ variants }) => {
  return (
    <motion.div variants={variants} className='md:text-left text-center md:max-w-72 lg:max-w-lg'>
      <h2 className='mt-4 text-4xl text-[#EB10E8] py-4 font-bold tracking-wide md:text-5xl lg:mt-8 lg:text-5xl'>
    Grow your <span className='text-gray-900'>Social Media Audience</span>
      </h2>
      <p className='text-2xl font-medium text-blue-500'>
      <ReactTyped
      strings={[
        "Grow Your Social Media Audience",
        "Boost Your Social Media Impact.",
        "Grow digital reach.",
      ]}
      typeSpeed={70}
      backSpeed={90}
      loop
    >
    </ReactTyped>
      </p>
      <p className='text-gray-600 text-center md:text-left mt-4 md:text-lg pb-4 md:pb-0'>
        Join thousands of brands and influencers who have amplified their social media presence with Glam Booster, a trusted service in social media enhancement.
      </p>
    </motion.div>
  )
}

export default HeroContent
