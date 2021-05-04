/* eslint-disable global-require */
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('postcss-easy-import'),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('autoprefixer'),
      ],
    },
  },
};
