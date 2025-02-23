import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { MdTouchApp } from "react-icons/md";
import Slider from 'react-slick';

const Services = () => {
  const serviceData = [
    {
        id:1,
        icon: FaUsers,
        title: "Audience Growth",
        description: " Glam Booster assists users in expanding their social media audience by providing services that increase followers, likes, and comments.",
    },
    {
        id:2,
        icon: FaBullhorn,
        title: "Content Promotion",
        description: "The platform offers tools to promote your content effectively, ensuring that your posts reach a wider audience.",
    },
    {
        id:3,
        icon: FaChartLine,
        title: "Analytics and Insights",
        description: " Glam Booster provides analytics to help users track their social media performance.",
    },
    {
        id:4,
        icon: MdTouchApp,
        title: "User-Friendly Interface",
        description: "The platform is designed with a user-friendly interface, making it easy for users to navigate and utilize the various tools and services offered.",
    },
]

  return (
    <section className='bg-[#FFE9FE] py-10'  id='services'>
      <div className='container'>
        <div>
          <div>
            <h1 
            data-aos="fade-up"
            className='text-center text-3xl md:text-4xl pb-7 font-bold text-[#EB10E8] pt-[2rem]'>Glam Booster Provides</h1>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20 md:gap-5 place-items-center'>
            {
              serviceData.map((data) => (
                <div 
                data-aos= "zoom-in"
                className='rounded-2xl bg-white hover:bg-[#EB10E8] hover:text-white relative shadow-xl duration-300 group max-w-[300px]'>
                    {/* image section */}
                    <div className=''>
                      <span><data.icon className='text-6xl md:text-8xl py-4 mx-auto'/></span>
                    </div>
                    <div className='p-4 text-center'>
                        {/* starRating section */}
                        <h1 className='text-xl font-bold py-8'>{data.title}</h1>
                        <p className='duration-300 text-sm line-clamp-2 pb-5'>{data.description}</p>
                    </div>
                </div>
              ))  
            }
        </div>
        </div>
    </section>
  )
}

export default Services
