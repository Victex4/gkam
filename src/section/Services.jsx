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

var settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}
  return (
    <section className='bg-[#FFE9FE] py-10 mb-10'  id='services'>
      <div className='container'>
        <div>
          <div>
            <h1 
            data-aos="fade-up"
            className='text-center text-4xl font-bold text-[#EB10E8]'>Glam Booster Provides</h1>
          </div>
        </div>
        <div className='py-[1rem]'>
          {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-20 p-8 md:gap-5 place-items-center'> */}
            <div data-aos= "zoom-in">
              <Slider {...settings}>
                  {
                    serviceData.map((data) => (
                      <div className='my-8 grid grid-cols-1 md:grid-cols-2 '>
                        <div 
                        className='flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-white/90 relative'>
                            {/* image section */}
                            <div className=''>
                              <span><data.icon className='text-6xl md:text-7xl mx-auto'/></span>
                            {/* details section */}
                            </div>
                            <div className='p-4 text-center'>
                                <h1 className='text-xl font-bold pb-5'>{data.title}</h1>
                                <p className='text-gray-500 group-hover:text-white duration-300 text-sm'>{data.description}</p>
                            </div>
                        </div>
                      </div>
                    ))  
                  }
              </Slider>
            </div>
            {/* </div> */}
        </div>
      </div>
    </section>
  )
}

export default Services
