const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin(['imagemin/src/*.{jpg,png,gif,svg}'], 'imagemin/dest', {
  plugins: [
    imageminMozjpeg({
      quality: 90,
    }),
    imageminPngquant({
      quality: 90,
    }),
    imageminGifsicle(), imageminSvgo(),
  ],
}).then(() => {
  console.log('Images optimized');
});