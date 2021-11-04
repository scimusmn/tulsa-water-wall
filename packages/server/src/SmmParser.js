'use strict';

const { Transform } = require('stream');

const packetRegex = /{[^{:}]*:[^{:}]*}/;

class SmmParser extends Transform {
  constructor(options) {
    // initialize stream in object mode so we can push
    // non-Buffer values
    super({ objectMode: true });
    this.buffer = Buffer.alloc(0);
  }

  static EatPacket(buf) {
    const str = buf.toString();
    let match = str.match(packetRegex);
    if (match === null)
      // no packet detected, leave buffer unmodified
      return [null, buf];
    // strip the buffer up to and including the packet
    buf = buf.slice(match.index + match[0].length);
    let [key, value] = match[0].slice(1, match[0].length - 1).split(':');
    return [{ key, value }, buf];
  }

  _transform(chunk, encoding, cb) {
    let data = Buffer.concat([this.buffer, chunk]);
    let packet;
    [packet, data] = SmmParser.EatPacket(data);
    while (packet != null) {
      this.push(packet);
      [packet, data] = SmmParser.EatPacket(data);
    }
    this.buffer = data;
    cb();
  }
}

module.exports = SmmParser;
