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
