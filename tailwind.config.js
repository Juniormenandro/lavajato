/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'teal-blue': '#2F6B7C',
        sky: colors.sky,
        cyan: colors.cyan,
        'custom-blue': {
          DEFAULT: 'rgb(102, 161, 184)',
          '50': 'rgb(173, 207, 222)', // um tom mais claro de custom-blue
          '900': 'rgb(23, 58, 94)', // um tom mais escuro de custom-blue
        },
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500', 
      },
    },
  },
  plugins: [],
  mode: 'jit',

  variants: {},
 
}
