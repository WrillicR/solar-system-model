/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        blark: {
          700: '#1D272A',
          800: '#0D171A',
          950: '#010A0D'
        },
        grue: {
          400: '#006B64',
          600: '#00453C'
        },
        yold: {
          400: '#9F8F5A',
          600: '#4F4226'
        },
        rud: {
          400: '#824747',
          600: '#4F2627'
        },
        plue: {
          400: '#353F75',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'Inter', 'sans-serif'],
        raleway: ['Raleway', 'Inter', 'sans-serif'],
        taprom: ['Taprom', 'Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'sq': '#ffffff -4px 4px',
        'sq-lg': '#ffffff -6px 6px',
      },
    },
  },
  plugins: [],
}

// 00453C green
// 4F2627 red
// 4F4226 yellow