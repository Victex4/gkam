import { delay, easeInOut } from "framer-motion";
import { MdExitToApp } from "react-icons/md";

export const EaseRight = (delay) => {
    return {
        hidden: {
            opacity: 0,
            x: 100,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: delay,
                ease: easeInOut,
            },
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: {
                duration: 0,
                ease: easeInOut,
            },
        },
    }
}