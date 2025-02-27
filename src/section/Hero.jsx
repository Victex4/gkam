import React from 'react'
import HeroContent from '../components/HeroContent'
import HeroImage from '../components/HeroImage'
import { motion } from 'framer-motion'
import { Typed } from 'react-typed'

const Hero = ({ menuOpen }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.0,
        ease: "easeOut"
      },
    },
  };

  const contentVariants = {
    hidden: {
      x: -50,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      },
    },
  };

  const imgVariants = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };
  return (
    <motion.section className='overflow-hidden bg-[#FFE9FE]' id='#'
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    >
      <div className={`container transition-all duration-300 ${menuOpen ? "px-10 blur-sm" : ""}`}>
      <div className='md:h-[700px] h-[700px] w-[400px] md:w-[700px] bg-[#F583F3] absolute -top-1/2 right-20 md:right-0 rounded-3xl rotate-12 md:rotate-45 -z-9'>

      </div>
        <div className='relative flex md:h-screen mt-[363px] flex-col-reverse items-center md:flex-row '>
            {/* Hero Content */}
                <HeroContent variants={contentVariants}/> 

            {/* Hero Image */}
                <HeroImage variants={imgVariants} />
        </div>
      </div>
    </motion.section>
  )
}

export default Hero
