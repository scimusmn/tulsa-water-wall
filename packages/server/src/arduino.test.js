const SerialPort = require('serialport');
const MockBinding = require('@serialport/binding-mock');
SerialPort.Binding = MockBinding;

const Arduino = require('./arduino.js');
const Parser = require('./SmmParser.js');


/* ~~~~~~~~~~~~~~~~ arduino constructors ~~~~~~~~~~~~~~~~ */

test('Arduino constructor produces the correct values', () => {
  const a1 = new Arduino();
  expect(a1.vendorId).toBeUndefined();
  expect(a1.productId).toBeUndefined();
  expect(a1.path).toBeUndefined();

  const a2 = new Arduino({ port: '/dev/null' });
  expect(a2.vendorId).toBeUndefined();
  expect(a2.productId).toBeUndefined();
  expect(a2.path).toBe('/dev/null');

  const a3 = new Arduino({ vendorId: 'dead', productId: 'beef' });
  expect(a3.vendorId).toBe('dead');
  expect(a3.productId).toBe('beef');
  expect(a3.path).toBeUndefined();
});


test('MetroMini constructor produces the correct vid/pid values', () => {
  const metro = new Arduino.MetroMini();
  expect(metro.vendorId).toBe('10c4');
  expect(metro.productId).toBe('ea60');
  expect(metro.path).toBeUndefined();
});


/* ~~~~~~~~~~~~~~~~ port management ~~~~~~~~~~~~~~~~ */

test('Arduino.FindPath() rejects with no matching port', () => {
  MockBinding.reset();
  return expect(Arduino.FindPath('dead', 'beef'))
    .rejects.toBe('No port found for [dead:beef]');
});


test('Arduino.FindPath() resolves as correct path with matching VID & PID', () => {
  MockBinding.reset();
  MockBinding.createPort('/dev/matchVID', { vendorId: 'dead', productId: 'eeee' });
  MockBinding.createPort('/dev/matchPID', { vendorId: 'eeee', productId: 'beef' });
  MockBinding.createPort('/dev/correct',  { vendorId: 'dead', productId: 'beef' });
  return Arduino.FindPath('dead', 'beef').then(path => {
    expect(path).toBe('/dev/correct');
  });
});


test('Arduino.FindPath() resolves as correct path without case sensitivity', () => {
  MockBinding.reset();
  MockBinding.createPort('/dev/matchVID', { vendorId: 'dead', productId: 'eeee' });
  MockBinding.createPort('/dev/matchPID', { vendorId: 'eeee', productId: 'beef' });
  MockBinding.createPort('/dev/correct',  { vendorId: 'dead', productId: 'beef' });
  return Arduino.FindPath('DEAD', 'BEEF').then(path => {
    expect(path).toBe('/dev/correct');
  });
});


// this doesn't work for some reason -- the error is thrown but Jest doesn't catch it.
// not entirely sure how to fix this. I'd prefer to return a Promise that rejects
// when the open fails, but that also doesn't seem to work. I'll revisit this at a later
// date.
/*test('Arduino.OpenPath() throws an error with no matching port', () => {
  MockBinding.reset();
  expect(() => Arduino.OpenPath('/dev/arduino')).toThrow();
  });*/


test('Arduino.OpenPath() correctly opens serial port', () => {
  MockBinding.reset();
  MockBinding.createPort('/dev/arduino');
  return Arduino.OpenPath('/dev/arduino', 115200).then(port => {
    expect(port.isOpen).toBe(true);
    expect(port.path).toBe('/dev/arduino');
  });
});


test('arduino.open() rejects with no path or VID/PID', () => {
  MockBinding.reset();
  const arduino = new Arduino();
  return expect(arduino.open())
    .rejects.toBe('Attempted to open port with no path or VID/PID set');
});


test('arduino.open() resolves correctly with path set', () => {
  MockBinding.reset();
  MockBinding.createPort('/dev/arduino');
  const arduino = new Arduino({port: '/dev/arduino'});
  return arduino.open().then(() => {
    expect(arduino.port.isOpen).toBe(true);
    expect(arduino.port.path).toBe('/dev/arduino');
    expect(arduino.port.baudRate).toBe(115200);
  });
});


test('arduino.open() rejects with no matching VID/PID', () => {
  MockBinding.reset();
  const arduino = new Arduino({ vendorId: 'dead', productId: 'beef' });
  return expect(arduino.open())
    .rejects.toBe('No port found for [dead:beef]');
});

test('arduino.open() resolves correctly with VID/PID set', () => {
  MockBinding.reset();
  MockBinding.createPort('/dev/arduino', { vendorId: 'dead', productId: 'beef' });
  const arduino = new Arduino({ vendorId: 'dead', productId: 'beef' });
  return arduino.open().then(() => {
    expect(arduino.port.isOpen).toBe(true);
    expect(arduino.port.path).toBe('/dev/arduino');
    expect(arduino.port.baudRate).toBe(115200);
  });
});


/* ~~~~~~~~~~~~~~~~ input parsing ~~~~~~~~~~~~~~~~ */

test('arduino.open() correctly sets up input parsing', () => {
  MockBinding.reset();
  MockBinding.createPort('/dev/arduino');
  let completed = { one: false, two: false };
  const arduino = new Arduino({ port: '/dev/arduino' });
  return arduino.open().then(() => {
    arduino.on('one', () => completed.one = true);
    arduino.on('two', () => completed.two = true);
    arduino.port.binding.emitData('{one:1}blah{two:2}{}::nonsense{three:3}');
    return new Promise(resolve => arduino.on('three', resolve));
  }).then(() => {
    expect(completed.one).toBe(true);
    expect(completed.two).toBe(true);
  });
});
