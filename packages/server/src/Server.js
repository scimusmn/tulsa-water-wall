const WebSocket = require('ws');

const WaterWall = require('./WaterWall.js');
const ArrayEncode = require('./ArrayEncode.js');


function encodeDrawing(drawing) {
  return drawing.map(
    line => line.split('')
      .map(x => Number(x))
  ).map(lineArray => ArrayEncode(lineArray));
}


const server = new WebSocket.Server({ port: 8080 });
const wall = new WaterWall();

wall.open().then(() => {
  console.log(wall.arduino.port);
  console.log('Arduino connection successful!');
});

server.on('connection', client => {
  client.on('message', message => {
    data = JSON.parse(message);
    drawing = encodeDrawing(data['publish-drawing']);
    console.log(`new drawing: ${drawing}`);
    wall.push(drawing);
  });
});
