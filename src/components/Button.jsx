import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion";
const Button = ({ children, variant = "primary", className }) => {

  const buttonVariants = {
    hover: {
      scale: 1.04,
      transition: {
        type: "spring",
        stiffness: "300",
        dampimg: 7,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  const variants = {
    primary: "bg-[#F36BF1] text-white/90 border-none hover:bg-[#EB10E8]",
    outline: "bg-transparent text-[#EB10E8] border-2 border-[#EB10E8] hover:bg-[#EB10E8] hover:text-white"
  }
  return (
    <motion.button className={twMerge(`rounded-full px-10 py-2 font-semibold ${variants[variant]}`, 
      className
    )}
    variants={buttonVariants}
    whileHover="hover"
    whileTap="tap"
    >
      {children}
    </motion.button>
  )
}

export default Button
