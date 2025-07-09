/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // darkMode: "class",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'plus-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff25'%3E%3Crect x='9' width='2' height='20'/%3E%3Crect y='9' width='20' height='2'/%3E%3C/g%3E%3C/svg%3E\")"
      },
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
      },
      keyframes: {
        'bounce-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
      animation: {
        'bounce-right': 'bounce-right 1s infinite',
      },
    },
  },
  
  plugins: [],
  darkMode: "class",
}