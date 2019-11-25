module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'last 2 versions',
        'ie >= 11',
        'iOS >= 9',
        'Android >= 4.4',
      ],
      grid: true,
      cascade: false,
    },
  },
};
