/*********************************
 *
 * Water Wall client
 *
 * This server simply serves the contents of public/
 * to http://localhost:3000
 *
 *********************************/


const express = require('express');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.listen(port);
