const Arduino = require('./arduino.js');
const ArrayEncode = require('./ArrayEncode.js');


class WaterWall {
  constructor() {
    this.queue = [];
    this.arduino = new Arduino.Mega();
    this.onRxReady = this.onRxReady.bind(this);
  }

  open() {
    return this.arduino.open().then(() => {
      this.arduino.on('rx-ready', this.onRxReady);
    });
  }

  onRxReady(state) {
  }
}


/* ~~~~~~~~~~~~~~~~ export ~~~~~~~~~~~~~~~~ */

module.exports = WaterWall;
