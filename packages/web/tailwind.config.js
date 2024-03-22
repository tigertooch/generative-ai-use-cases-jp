/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['M PLUS Rounded 1c'],
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      colors: {
        'aws-squid-ink': '#fff',
        'aws-anchor': '#003181',
        'aws-sky': '#0000001f',
        'aws-rind': '#FBD8BF',
        'aws-smile': '#000',
        'aws-font-color': '#232F3E',
        'aws-ml': '#01A88D',
        'aws-backgroud':'#3f4c56',
        'aws-test-col':'white',
      },
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
  ],
};
