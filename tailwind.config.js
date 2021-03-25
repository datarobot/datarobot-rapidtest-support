module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        black: '#111111',
        blue: {
          lightest: '#f3f5f8',
          lighter: '#66aaf0',
          light: '#006AB7',
          DEFAULT: '#00528D',
          dark: '#004374',
        },
        'blue-grey': '#ACD5D7',
        green: '#CAEED8',
        'dark-green': '#33a15e',
        red: '#F9DCD7',
        'dark-red': '#Df472C',
        orange: '#F5D2A2',
        transparent: 'transparent',
        'dark-grey': '#283542',
        purple: '#00528D',
        'dark-purple': '#4D37DD',
        yellow: '#FF8326',
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/typography')],
};
