const path = require("path");

module.exports = {
  plugins: {
    'tailwindcss': {},
    'postcss-mixins': {
      mixinsDir: path.join(__dirname, 'src/assets/css/mixins')
    },
    'postcss-simple-vars': {
      variables: function () {
        return require('./src/assets/css/css-variables');
      }
    },
    'postcss-nested': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'focus-within-pseudo-class': false
      }
    },
    'postcss-calc': {},
    'postcss-rem': {
      fallback: true,
    },
    'cssnano': {},
  }
}
