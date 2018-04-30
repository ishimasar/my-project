const ssi = require('./node_modules/browsersync-ssi');

module.exports = {
  'files': './src/**/*.css, ./src/**/*.js, ./src/**/*.html',
  'server': {
    baseDir: './src/',
    index: 'index.html'
  },
  'proxy': false,
  'port': 3000,
  'middleware': ssi({
    baseDir: './src/',
    ext: '.html',
    version: '1.4.0'
  })
}