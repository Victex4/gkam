/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // darkMode: "class",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "serif"],
        },
  
      dropShadow: {
        'large': '-10px 10px 12px rgba(0, 0, 0, 1)',
      },
      colors: {
        primary: "#fea928",
        secondary: "#ed8900",
      },
      container: {
        center: true,
        padding:{
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      keyframes:{
        "bounce-up":{
          "0%":{
            transform: "translateY(0)",
          },
          "50%":{
            transform: "translateY(-10px)",
          },
          "100%":{
            transform: "translateY(0)",
          },
        },
        "move-left":{
          "0%":{
            transform: "translateX(0)",
          },
          "100%":{
            transform: "translateX(-50%)",
          },
        },
      },
      animation: {
        "bounce-up": "bounce-up 3s ease-in-out infinite",
        "move-left": "move-left 1s linear infinite",
      }
    },
  },
  plugins: [],
  darkMode: "class",
}