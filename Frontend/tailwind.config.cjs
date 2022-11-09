/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      backgroundImage:{
        galaxy: "url('/background-galaxy.png')",
        'desafio-gradient': 'linear-gradient(175deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 89.88%)'
      },
      
    },
  },
  plugins: [],
}
