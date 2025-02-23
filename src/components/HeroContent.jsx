import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { ReactTyped } from "react-typed";

const HeroContent = ({ variants }) => {
  return (
    <motion.div variants={variants} className='text-left md:max-w-72 lg:max-w-lg'>
      <h2 className='mt-4 text-4xl text-[#EB10E8] font-bold tracking-wide md:text-5xl lg:mt-8 lg:text-5xl'>
    Boost your <span className='text-gray-900'><ReactTyped
      strings={[
        "social media impact",
        "online presence.",
        "digital reach.",
      ]}
      typeSpeed={80}
      backSpeed={90}
      loop
    >
    </ReactTyped></span>
      </h2>
      <p className='text-gray-500 mt-4 md:text-lg pb-4 md:pb-0'>
        Join thousands of brands and influencers who have amplified their social media presence with Glam Booster, a trusted service in social media enhancement.
      </p>
    </motion.div>
  )
}

export default HeroContent
