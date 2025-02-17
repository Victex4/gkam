import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { ReactTyped } from "react-typed";

const HeroContent = ({ variants }) => {
  return (
    <motion.div variants={variants} className='text-left md:max-w-72 lg:max-w-lg'>
      <h2 className='mt-4 text-3xl font-bold tracking-wide text-gray-500 md:text-4xl lg:mt-8 lg:text-5xl'>
        {/* <Typed 
          strings={[
            "Boost your social media impact",
            "Enhance your online presence.",
            "Expand your digital reach.",
          ]}
          typeSpeed={150}
          backSpeed={100}
          loo
        /> */}
        {/* <ReactTyped strings={["Here you can find anything"]} typeSpeed={40} />
    <br /> */}

    <ReactTyped
      strings={[
        "Boost your social media impact",
        "Enhance your online presence.",
        "Expand your digital reach.",
      ]}
      typeSpeed={80}
      backSpeed={90}
      loop
    >
    </ReactTyped>
      </h2>
      <p className='text-gray-400 mt-4 md:text-lg'>
        Join thousands of brands and influencers who have amplified their social media presence with Glam Booster, a trusted service in social media enhancement.
      </p>
      <div className='flex items-center gap-2 mt-5'>
        <Button>Register</Button>
        <Button variant='outline'>Login</Button>
      </div>
    </motion.div>
  )
}

export default HeroContent
