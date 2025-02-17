import React from 'react'
import userImage from "../assets/social4-removebg-preview.png"
import AnimatedIcon from './AnimatedIcon'
import { BiLogoCss3, BiLogoJavascript, BiLogoReact, BiLogoTailwindCss } from 'react-icons/bi'
import { motion } from 'framer-motion'

const HeroImage = ({ variants }) => {
  return (
    <motion.div 
    variants={variants}
    className='mask-gradient absolute right-0 top-0 h-[550px] w-full overflow-hidden rounded-bl-full rounded-br-full border-r-[10px] border-blue-500 bg-[#EB10E8] md:h-[600px] md:w-[450px]'> 
      <img className='absolute animate-bounce-up bottom-0 w-[450px] top-1/2 right-9' src={userImage} alt="User Image" />
    </motion.div>
  )
}

export default HeroImage
