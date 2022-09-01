/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    colors: {
      white: '#FFFFFF',
      darkblue: '#131837',
      darkblue2: '#1C2146',
      lightblue: '#5D6AE0',
    },
    borderRadius: {
      large: '40px',
    },
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '977px',
      xl: '1441px',
    },
    extend: {
      backgroundImage: {
        'pattern': "url('/img/Vector.png')",
      },
      fontFamily: {
        'inter': ['inter', 'sans-serif'],
      },
      fontWeight: {
        light: 100,
        regular: 400,
        medium: 500,
        extraBold: 800,
      },
      fontSize: {
        'xs': '.75rem', //12px
        'sm':'1rem', // 16px
        'ml': '1.25rem', //20px
      },
      translate: {
        mobile: {

        }
      }
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}


