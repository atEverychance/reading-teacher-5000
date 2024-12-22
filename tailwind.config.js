/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Baloo 2', 'system-ui', 'sans-serif'],
        display: ['Quicksand', 'system-ui', 'sans-serif'],
        reading: ['Andika', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        bigBounce: {
          '0%, 100%': { transform: 'translate(0, 30vh) scale(1)' },
          '50%': { transform: 'translate(0, -20vh) scale(0.9)' }
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        bigBounce: 'bigBounce 4.8s cubic-bezier(0.36, 0, 0.66, -0.56) infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite'
      },
      backgroundImage: {
        'punk-unicorn': 'linear-gradient(45deg, #4a0072, #9900ff, #ff00ff)',
        'punk-mermaid': 'linear-gradient(45deg, #006666, #00ccff, #0099ff)',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-gradient-to-br',
    'from-pink-200',
    'from-blue-200',
    'to-pink-500',
    'to-red-500',
    'to-orange-500',
    'to-yellow-500',
  ],
}