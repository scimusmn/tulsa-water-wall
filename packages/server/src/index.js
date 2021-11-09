const ws = require('ws');
const express = require('express');
const cors = require('cors');
const WaterWall = require('./WaterWall.js');
const ArrayEncode = require('./ArrayEncode.js');

//
// Start an Express server
//
// We use Express so that we can allow CORS for WS communication between client and server
//
const app = express();
app.use(cors({
  origin: true,
  credentials: true
}));

//
// ???
//
// TODO: Describe what this does
//
function encodeDrawing(drawing) {
  return drawing.map(
    line => line.split('')
      .map(x => Number(x))
  ).map(lineArray => ArrayEncode(lineArray));
}

//
// ???
//
// TODO: Describe what this does
// Commented out for now to allow server to run without Arduino in place.
//
// const wall = new WaterWall();
// wall.open().then(() => {
//   console.log(wall.arduino.port);
//   console.log('Arduino connection successful!');
// });

//
// WebSocket listener
//
const wsServer = new ws.Server({ noServer: true, path: '/ws' });
wsServer.on('connection', socket => {
  socket.on('message', message => {
    // TODO: Do something with the grid that is sent through
    // Right now we just console.log it
    const grid = JSON.parse(message.toString());
    console.log(grid);
    console.log(Array.isArray(grid) ? 'array' : typeof grid);
    console.log('----^ ^ ^ ^ ^ grid ^ ^ ^ ^ ^----');

    // TODO: Update this code to use the Arduinos with the sent drawing
    // Commented out for now to allow server to run without Arduino in place.
    // drawing = encodeDrawing(data['publish-drawing']);
    // console.log(`new drawing: ${drawing}`);
    // wall.push(drawing);
  });
});

//
// Set the Express server to listen on 8081
//
const server = app.listen(8081);

//
// Use WebSockets to handle the ws:// connections from the Express server
//
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
