const fs = require('fs');
const sharp = require('sharp');

// Parses CLI
const args = process.argv.slice(2);

// Utility function
const getImgName = (imgPath) => {
  return imgPath.split('.png')[0];
};

// Converts Original img to .webp
function convertOriginal() {
  fs.readdirSync('./assets').forEach((file) => {
    const name = getImgName(file);
    sharp(`./assets/${name}.png`)
      .toFormat('webp')
      .webp({ quality: 100 })
      .toFile(`./convertedImages/${name}.webp`);
  });
}

// Convert img to new dimension
function convertToDifferentSizes(width, suffix, imgName) {
  const imgNameNoExt = getImgName(imgName);
  sharp(`./assets/${imgNameNoExt}.png`)
    .resize(width)
    .toFormat('webp')
    .webp({ quality: 100 })
    .toFile(`./convertedImages/${imgNameNoExt}${suffix}.webp`);
}

// // Get multiple sizes, feel free to change dimensions to suit your needs.
function getMultipleSizes() {
  fs.readdirSync('./assets').forEach((file) => {
    convertToDifferentSizes(480, '_S', file);
    convertToDifferentSizes(768, '_M', file);
    convertToDifferentSizes(1024, '_L', file);
    convertToDifferentSizes(1440, '_XL', file);
  });
}

convertOriginal();
if (args[0] !== null && args[0] === '-m') {
  getMultipleSizes();
}
