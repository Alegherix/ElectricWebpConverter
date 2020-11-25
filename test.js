const fs = require('fs');
const sharp = require('sharp');

//Convert img to new dimension
function convertImg(width, suffix, imgName) {
  const imgNameNoExt = imgName.split('.webp')[0];
  sharp(`./convertedImages/${imgName}`)
    .resize(width)
    .toFile(`./convertedImages/${imgNameNoExt}${suffix}.webp`, (err, info) => {
      if (err) {
        console.log(err.message);
        throw err;
      } else {
        console.log(info);
      }
    });
}

// Get multiple sizes, feel free to change dimensions to suit your needs.
function getMultipleSizes() {
  fs.readdirSync('./convertedImages').forEach((file) => {
    convertImg(480, '_S', file);
    convertImg(768, '_M', file);
    convertImg(1024, '_L', file);
    convertImg(1920, '_XL', file);
  });
}

getMultipleSizes();
