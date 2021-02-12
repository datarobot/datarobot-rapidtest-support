module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: '#111111',
        blue: '#5282CC',
        'dark-blue': '#3668b5',
        'light-blue': '#B2C7E2',
        'blue-grey': '#ACD5D7',
        green: '#CAEED8',
        red: '#F9DCD7',
        orange: '#F5D2A2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
