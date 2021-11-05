const WaterWall = require('./WaterWall.js');

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
    expect(mockArduino.on.mock.calls.length).toBe(1);

    expect(mockArduino.on.mock.calls[0][0]).toBe('rx-ready');
    expect(mockArduino.on.mock.calls[0][1]).toBe(wall.onRxReady);
  });
});
