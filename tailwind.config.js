/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sectionGreen: "#709A86",
        sectionOrange: "#E38C24",
        sectionPink: "#EAB8D9",
        sectionPurple: "#C572A5",
        sectionLightPurple: "#f2d0e6",
        sectionDarkPurple: "#964083"
      },
      fontFamily: {
        heading: ["Bagel Fat One", "cursive"],
        body: ["Roboto Condensed", "sans-serif"],
      },
      fontSize: {
        '8.5xl': '5.5rem', 
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-delayed': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-20px)' },
          '60%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        cloud: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' }
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-delayed': 'bounce-delayed 3s infinite',
        'bounce-slow': 'bounce-delayed 4s infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'cloud': 'cloud 8s linear infinite',
      },
    },
    screens: {
      sm: { max: "676px" }, 
      md: "677px",          
      lg: "1024px", 
      xl: "1280px",
    },
  },
  plugins: [],
};