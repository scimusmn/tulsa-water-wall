# Water Wall Client

This program provides a user-friendly interface for creating drawings and communicating them to the water wall server for display on the physical water wall. This program is intended to run on both kiosks and to be rendered by the [stele] kiosk software.

## Protocol

This app expects to see the water wall server expose a websocket at `ws://192.168.25.101:8081/ws`. When the user requests transmission of their drawing to the server, this program will build an array of arrays representing the image. Each subarray represents a single row; each boolean element of the row arrays represents the value of that column (`true` if water should be present and `false` otherwise). It then converts this array to a string with `JSON.stringify()` and transmits to the websocket.

## Overview

There are essentially two global variables: `dock`, which stores relevant DOM elements, and `state` which stores program state. Events can modify the state, and then there are various callbacks that listen for particular state changes and update the document in response. The only exception to this is the `AppUpdate()` function, which both responds to changes in state and may modify state.

Here is a brief description of the contents of each file:

* `App.js`: the main app entry point, registration of event listeners and state listeners and `AppUpdate()`
* `Canvas.js`: Functions for drawing to and reading data from the canvas
* `Dom.js`: Functions for loading DOM elements into `dock` and function for modifying DOM elements in response to state changes.
* `State.js`: the implementation of the various functions that modify `state` and register state listeners
* `index.html`: the main HTML page.

The `images/` folder contains the various SVG files needed to render the buttons, and the `css/` folder contains both the main stylesheet as well as the required fonts.

[stele]: https://github.com/scimusmn/stele