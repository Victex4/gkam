import React from 'react'
import userImage from "../assets/heroImage-removebg-preview.png"
import AnimatedIcon from './AnimatedIcon'
import { BiLogoCss3, BiLogoJavascript, BiLogoReact, BiLogoTailwindCss } from 'react-icons/bi'
import { motion } from 'framer-motion'
import blob from "../assets/blob.svg"

const HeroImage = ({ variants }) => {
  return (
    <motion.div> 
      <div className='absolute md:right-0 left-28 top-0 translate-y-1/2 mt-[12rem] md:w-[350px] w-[250px] h-[250px] md:h-[350px] rounded-full border-[#EB10E8] border-[32px] z-10' data-aos="fade-up"></div>
      <img className='absolute animate-bounce-up left-8 top-0 md:left-1/2 md:top-0 mt-[6rem] w-[1200px] md:w-[800px] right-0 z-20' data-aos="fade-up" src={userImage} alt="User Image" />
      <img src={blob} alt="" />
    </motion.div>

  )
}

export default HeroImage
