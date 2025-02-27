// import projectImage from "../assets/portfolio2.png"
// import projectImage1 from "../assets/dashboard1.jpg"
// import projectImage2 from "../assets/ecommerce.jpg"
import { BiCodeAlt } from "react-icons/bi";
import { BiMobileAlt } from "react-icons/bi";
import { BiPalette } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export const menuItems = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
];

// export const projects = [
//     {
//         id: 1,
//         title: "Responsive Portfolio Website",
//         Image: projectImage,
//         description: 
//             "A sleek and a fully responsive portfolio website to showcase skills, projects and experience. Bulit with HTML, CSS, and Javascript with modern design practices"
//     }, 
//     {
//         id: 2,
//         title: "E-Commerce Platform",
//         Image: projectImage2,
//         description: 
//             "An e-commerce platform with features like: Product listing, Cart functionality and User authentication. Developed using React, Node.js, Express and MongoDB."
//     },
//     {
//         id: 3,
//         title: "Dashboard Design",
//         Image: projectImage1,
//         description: 
//             "A highly customizable and interactive admin dashboard built with Tailwind css, React, and Chart.js to visualize complex data effectively"
//     },
// ];

export const services = [
    {
        title: "Web Development",
        description: "The process of building, programming, and maintaining websites and web applications. Website developers use various programming languages, like HTML, CSS, and JavaScript, to develop websites and web applications. ",
        icon: BiCodeAlt
    },
    {
        title: "Mobile App Development",
        description: "The process of creating software applications designed specifically to run on smartphones, tablets, and other mobile devices, involving the design, coding, and testing of user interfaces to deliver functional features and a seamless user experience on a mobile platform. ",
        icon: BiMobileAlt
    },
    {
        title: "Graphic Designs",
        description: "The art and practice of planning and projecting ideas and experiences with visual and textual content",
        icon: BiPalette
    },
]

export const contactDetails = [
   {
        id: 1,
        type: "Email",
        value: "eberevictory3@gmail.com",
        link: "mailto:eberevictory3@gmail.com", 
        icon: MdEmail 
   },
   {
        id: 2,
        type: "Phone",
        value: "+234 806 549 3663",
        link: "tel:08065493663", 
        icon: FaPhone  
    },
   {
        id: 3,
        type: "Whatsapp",
        value: "Glam Booster",
        link: "https://wa.me/+2348065493663", 
        icon: FaWhatsapp  
    },
   {
        id: 3,
        type: "Instagram",
        value: "Instagram",
        link: "https://www.instagram.com/yourusername/", 
        icon: FaInstagram  
    },
   {
        id: 3,
        type: "Twitter",
        value: "Twitter",
        link: "https://wa.me/+2348065493663", 
        icon: FaXTwitter  
    },
]
