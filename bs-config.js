// const ssi = require('./node_modules/browsersync-ssi');
const connectSSI = require('./node_modules/connect-ssi');

module.exports = {
  files:
    './dest/assets/*.css, ./dest/assets/*.js, ./dest/*.html, ./dest/**/*.html',
  server: {
    baseDir: './dest/',
    index: 'index.html',
  },
  port: 3000,
  middleware: connectSSI({
    baseDir: './dest/',
    ext: '.html',
  }),
  open: 'external',
  notify: false,
};
