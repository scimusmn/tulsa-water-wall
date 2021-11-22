const getPixels = require('get-pixels');
const { readdir } = require('fs/promises');
const arrayEncode = require('./ArrayEncode.js');


function img2array(path) {
  // #000000 pixels are false
  // all others are true
  const pixel2boolean = (pixels, row, col) => {
    if (pixels.get(col, row, 0) > 0 ||
	pixels.get(col, row, 1) > 0 ||
	pixels.get(col, row, 2) > 0)
      return true;
    return false;
  };

  return new Promise((resolve, reject) => {
    getPixels(path, (err, pixels) => {
      if (err)
	reject(`failed to open image ${path}`);
      console.log(err, pixels);
      const [ cols, rows, channels ] = pixels.shape;
      
      const result = [];
      
      for (let i=0; i<rows; i++) {
	const row = [];
	for (let j=0; j<cols; j++) {
	  row.push(pixel2boolean(pixels, i, j));
	}
	result.push(row);
      }
      resolve(result);
    });
  });
}


function img2encoded(path) {
  return img2array(path)
    .then(array => array.map(row => arrayEncode(row)));
}


function loadDrawings() {
  return readdir('drawings')
    .then(files => {
      const drawings = [];
      for (let filename of files) {
	drawings.push(img2encoded(`drawings/${filename}`));
      }
      return Promise.all(drawings);
    });
}


module.exports = loadDrawings;
