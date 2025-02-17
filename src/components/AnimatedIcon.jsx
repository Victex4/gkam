import React from 'react'
import { twMerge } from 'tailwind-merge'

const AnimatedIcon = ({ Icon, className }) => {
  return (
    <div className={twMerge(`flex absolute animate-bounce-up`, className)}>
        <Icon className="text-white/80" size={50}/> 
      
    </div>
  )
}

export default AnimatedIcon
