const webp = require('webp-converter');
const fs = require('fs');

// Returnerar filnamn
const getImgName = (imgPath) => {
  return imgPath.split('.png')[0];
};
const imgPaths = [];
fs.readdirSync('./assets').forEach((file) => {
  imgPaths.push(file);
});

imgPaths.forEach((img) => {
  const name = getImgName(img);
  const quality = 80;
  webp.cwebp(
    `./assets/${name}.png`,
    `./convertedImages/${name}.webp`,
    `-q ${quality}`
  );
});
