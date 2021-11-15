const ws = require('ws');
const express = require('express');
const cors = require('cors');
const WaterWall = require('./WaterWall.js');
const ArrayEncode = require('./ArrayEncode.js');

const logArduino = true;

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
// Convert drawing object to array of arrays of booleans
// Each bool array represents a 120-element line.
// There should be 80 lines.
//
function arrayDrawing(drawingObject) {
  return Object.keys(drawingObject)
    .map(lineKey => Object.values(drawingObject[lineKey]).map(element => element.painted));
}


//
// Encode an array-of-arrays drawing into an array of base64 strings
// for upload to the arduino.
//
function encodeDrawing(array) {
  return array.map(line => ArrayEncode(line));
}

//
// Open and initialize WaterWall Arduino manager
//
const wall = new WaterWall(logArduino);
wall.open().then(() => {
  console.log(wall.arduino.port);
  console.log('Arduino connection successful!');
});

//
// WebSocket listener
//
const wsServer = new ws.Server({ noServer: true, path: '/ws' });
wsServer.on('connection', socket => {
  socket.on('message', message => {
    const grid = JSON.parse(message.toString());
    const drawing = encodeDrawing(arrayDrawing(grid));
    console.log(drawing);
    wall.push(drawing);
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
