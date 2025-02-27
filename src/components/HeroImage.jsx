import React from 'react'
import userImage from "../assets/heroimg.webp"
import AnimatedIcon from './AnimatedIcon'
import { BiLogoCss3, BiLogoJavascript, BiLogoReact, BiLogoTailwindCss } from 'react-icons/bi'
import { motion } from 'framer-motion'
// import blob from "../assets/blob.svg"

const HeroImage = ({ variants }) => {
  return (
    <motion.div> 
      <img className='absolute hidden md:block animate-bounce-up left-8 top-0 md:left-auto md:top-0 mt-[6rem] w-[400px] md:w-[500px] right-0 z-20' data-aos="fade-up" src={userImage} alt="User Image" />
      {/* <img src={blob} alt="" /> */}
    </motion.div>

  )
}

export default HeroImage
