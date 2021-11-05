const WaterWall = require('./WaterWall.js');
const DefaultDrawings = require('./DefaultDrawings.js');

function MockArduino() {
  this.open = jest.fn().mockResolvedValue();
  this.on = jest.fn((key, cb) => {});
  this.send = jest.fn((key, value) => {});
}


test('WaterWall.open() correctly sets up arduino', () => {
  const wall = new WaterWall();
  const mockArduino = new MockArduino();
  wall.arduino = mockArduino;

  return wall.open().then(() => {
    expect(mockArduino.open.mock.calls.length).toBe(1);
    expect(mockArduino.on.mock.calls.length).toBe(2);

    expect(mockArduino.on.mock.calls[0][0]).toBe('rx-ready');
    expect(mockArduino.on.mock.calls[0][1]).toBe(wall.onRxReady);

    expect(mockArduino.on.mock.calls[1][0]).toBe('acknowledge-line');
    expect(mockArduino.on.mock.calls[1][1]).toBe(wall.onAcknowledgeLine);
  });
});


test('WaterWall correctly sends data', () => {
  const wall = new WaterWall();
  const mockArduino = new MockArduino();
  wall.arduino = mockArduino;

  expect(mockArduino.send.mock.calls.length).toBe(0);

  wall.onRxReady('1');
  wall.onRxReady('1'); // shouldn't do anything until drawing fully transmitted
  wall.onRxReady('1');
  for (let i=0; i<80; i++) {
    wall.onAcknowledgeLine();
  }

  expect(mockArduino.send.mock.calls.length).toBe(82);
  expect(mockArduino.send.mock.calls[0][0]).toBe('begin-drawing');
  expect(mockArduino.send.mock.calls[0][1]).toBe('1');

  for (let i=1; i<81; i++) {
    expect(mockArduino.send.mock.calls[i][0]).toBe('line');
    expect(mockArduino.send.mock.calls[i][1]).toBe(DefaultDrawings[0][80-i]);
  }

  expect(mockArduino.send.mock.calls[81][0]).toBe('publish-drawing');
  expect(mockArduino.send.mock.calls[81][1]).toBe('1');
});


function matchDrawing(mockArduino, offset, drawing) {
  const o = offset * (drawing.length+2);
  
  expect(mockArduino.send.mock.calls[o][0]).toBe('begin-drawing');
  expect(mockArduino.send.mock.calls[o][1]).toBe('1');

  for (let i=0; i<drawing.length; i++) {
    expect(mockArduino.send.mock.calls[o+i+1][0]).toBe('line');
    expect(mockArduino.send.mock.calls[o+i+1][1]).toBe(drawing[drawing.length-i-1]);
  }

  expect(mockArduino.send.mock.calls[o+drawing.length+1][0]).toBe('publish-drawing');
  expect(mockArduino.send.mock.calls[o+drawing.length+1][1]).toBe('1');
}


test('WaterWall iterates over all default drawings', () => {
  const wall = new WaterWall();
  wall.arduino = new MockArduino();

  wall.onRxReady('1');
  for (let i=0; i<80; i++)
    wall.onAcknowledgeLine();

  wall.onRxReady('0');
  wall.onRxReady('1');
  for (let i=0; i<80; i++)
    wall.onAcknowledgeLine();

  wall.onRxReady('0');
  wall.onRxReady('1');
  for (let i=0; i<80; i++)
    wall.onAcknowledgeLine();

  wall.onRxReady('0');
  wall.onRxReady('1');
  for (let i=0; i<80; i++)
    wall.onAcknowledgeLine();

  expect(wall.arduino.send.mock.calls.length).toBe(82*4);

  matchDrawing(wall.arduino, 0, DefaultDrawings[0]);
  matchDrawing(wall.arduino, 1, DefaultDrawings[1]);
  matchDrawing(wall.arduino, 2, DefaultDrawings[2]);
  matchDrawing(wall.arduino, 3, DefaultDrawings[0]);
});


test('WaterWall correctly queues and displays drawing received during transmission', () => {
  const wall = new WaterWall();
  wall.arduino = new MockArduino();

  wall.onRxReady('1');
  for (let i=0; i<40; i++)
    wall.onAcknowledgeLine();

  //insert new
  wall.push(DefaultDrawings[2]);

  for (let i=40; i<80; i++)
    wall.onAcknowledgeLine();

  wall.onRxReady('0');
  wall.onRxReady('1');
  for (let i=0; i<80; i++)
    wall.onAcknowledgeLine();

  wall.onRxReady('0');
  wall.onRxReady('1');
  for (let i=0; i<80; i++)
    wall.onAcknowledgeLine();

  wall.onRxReady('0');
  wall.onRxReady('1');
  for (let i=0; i<80; i++)
    wall.onAcknowledgeLine();

  expect(wall.arduino.send.mock.calls.length).toBe(82*4);

  matchDrawing(wall.arduino, 0, DefaultDrawings[0]);
  matchDrawing(wall.arduino, 1, DefaultDrawings[2]);
  matchDrawing(wall.arduino, 2, DefaultDrawings[1]);
  matchDrawing(wall.arduino, 3, DefaultDrawings[2]);
});
