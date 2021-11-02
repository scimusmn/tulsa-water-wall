'use strict';

const { Buffer } = require('buffer');

function getByte(array, startIndex) {
    const array8 = array.slice(startIndex, startIndex+8);
    let power = 128;
    let b = 0;
    for (let i of array8) {
	b = i ? b + power : b;
	power = power/2;
    }
    return b;
}


function ArrayEncode(boolArray) {
    const numBytes = Math.floor(boolArray.length/8);
    let bytes = [];
    for (let i=0; i<numBytes; i++) {
	bytes.push(getByte(boolArray, 8*i));
    }
    const buf = Buffer.from(bytes);
    return buf.toString('base64');
}


/* ~~~~~~~~~~~~~~~~ export ~~~~~~~~~~~~~~~~ */

module.exports = ArrayEncode;
