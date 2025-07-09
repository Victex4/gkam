import React, { useEffect } from 'react'

const Alert = ({alertType, setMsg, msg}) => {
    useEffect(() =>{
        setTimeout(() => {
            setMsg('')
        },5000)
    },[])
  return (
    <div>
        <p className=' text-center fixed z-30 top-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.3)] left-[30px] flex justify-center rounded-md align-middle bg-red-500 text-white mb-5 px-6 py-1'>{msg}</p>
    </div>
  )
}

export default Alert
