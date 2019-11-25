const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin(['src/img/*.{jpg,png,gif,svg,webp,ico}'], {
  plugins: [
    imageminMozjpeg({
      quality: 85,
    }),
    imageminPngquant({
      quality: 90,
    }),
    imageminGifsicle(),
    imageminSvgo(),
  ],
  replaceOutputDir: (output) => {
    return output.replace(/src\/img\//, './dest/assets/img/');
  },
}).then(() => {
  console.log('Images optimized');
});
