/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html;.js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors:{
        'primary':  '#5c059b',
        'secondary': '#1E293B',
        // casas: '#D6D5C9'
      }
    },
  },
  plugins: [],
}

