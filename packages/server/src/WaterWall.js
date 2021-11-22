const Arduino = require('./arduino.js');

class WallMode {
  static WaitForReady = new WallMode('Wait for Ready');
  static Transmitting = new WallMode('Transmitting');

  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

class WaterWall {
  constructor(DefaultDrawings, log = false) {
    this.state = {
      queue: [],
      mode: WallMode.WaitForReady,
      lineIndex: null,
      nextDefault: 0,
    };

    this.arduino = new Arduino.Mega();
    this.arduino.log = log;
    this.DefaultDrawings = DefaultDrawings;
    this.onRxReady = this.onRxReady.bind(this);
    this.onAcknowledgeLine = this.onAcknowledgeLine.bind(this);
  }

  open() {
    return this.arduino.open().then(() => {
      this.arduino.on('rx-ready', this.onRxReady);
      this.arduino.on('acknowledge-line', this.onAcknowledgeLine);
    })
  }

  _sendLine() {
    this.arduino.send('line', this.state.queue[0][this.state.lineIndex]);
    this.state.lineIndex -= 1;
  }

  onRxReady(state) {
    if (state === '0') {
      // arduino cannot receive at the moment, do nothing
      this.state.mode = WallMode.WaitForReady;
      return;
    }

    if (this.state.mode === WallMode.Transmitting)
      // we are already transmitting a drawing, ignore
      return;

    this.state.mode = WallMode.Transmitting;
    this.arduino.send('begin-drawing', '1');

    if (this.state.queue.length === 0) {
      this.state.queue.push(this.DefaultDrawings[this.state.nextDefault]);
      this.state.nextDefault = (this.state.nextDefault + 1) % this.DefaultDrawings.length;
    }

    this.state.lineIndex = this.state.queue[0].length - 1;
    this._sendLine();
  }

  onAcknowledgeLine() {
    if (this.state.mode === WallMode.WaitForReady) {
      // we're waiting for the arduino to be ready for the next drawing; ignore
      return;
    }

    if (this.state.lineIndex < 0) {
      // all of the drawing has been transmitted, finalize
      this.arduino.send('publish-drawing', '1');
      this.state.queue.shift();
      this.state.mode = WallMode.WaitForReady;
      return;
    }

    this._sendLine();
  }

  push(drawing) {
    this.state.queue.push(drawing);
  }
}

/* ~~~~~~~~~~~~~~~~ export ~~~~~~~~~~~~~~~~ */

module.exports = WaterWall;
