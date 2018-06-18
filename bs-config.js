const ssi = require('./node_modules/browsersync-ssi');
// const connectSSI = require('./node_modules/connect-ssi');

module.exports = {
  'files': './src/**/*.css, ./src/**/*.js, ./src/**/*.html',
  'server': {
    baseDir: './src/',
    index: 'index.html'
  },
  // 'open' :'external',
  'proxy': false,
  'port': 3000,
  'middleware': ssi({
    baseDir: './src/',
    ext: '.html',
    version: '1.4.0'
  })
}

// SSI使用
// module.exports = {
//   'files': './src/**/*.css, ./src/**/*.js, ./**/*.shtml',
//   'server': {
//     baseDir: './html/',
//     index: 'index.shtml'
//   },
//   'port': 3000,
//   'middleware': connectSSI({
//     baseDir: './html/',
//     ext: '.shtml'
//   }),
//   // 'open': 'external',
//   'notify': false
// }