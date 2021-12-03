# Server
Node server that runs on **one** of the kiosk PCs. Communicates via websockets with client interfaces. Controls traffic to Arduino.

## Protocol

This app receives data from clients via a websocket and then transforms and transmits that data to an Arduino Mega. It expects the Arduino to be connected to the computer *before* it starts up, and will throw an error if this is not the case.

Clients transmit `JSON.stringify()`-encoded strings to the websocket which should decode to an array-of-arrays-of-booleans. There are 80 subarrays, each representing a row; each subarray contains 120 booleans, each representing a single pixel. `true` means that that pixel should contain water, and `false` means that it should not.

When communicating with the Arduino, this program uses stele-style packets at 115200 baud, as detailed below.

| Source | Key | Value | Notes |
|--------|-----|-------|-------|
| Arduino | rx-ready | 0/1 | 1 = Arduino can accept data, and is not in the middle of a time-sensitive operation. 0 = Is not available to accept data. The arduino will send {rx-ready:1} after booting. |
| Arduino | acknowledge-line | 1 | The Arduino sends this message when it has received and decoded a line, and is ready for another message. |
| Server | begin-drawing | 1 | The arduino will clear and prepare the drawing buffer for a new drawing. |
| Server | line | [base64-encoded binary data] | This will be a base64 string encoding 120 bits (15 bytes). The Arduino will unpack and store as a row in the current drawing buffer. Each bit of the decoded sequence corresponds to a single solenoid (0 for off, 1 for on). A drawing requires 80 such lines to be transmitted. |
| Server | publish-drawing | 1 | Finalize the drawing buffer and then begin rendering it to the wall. This will result in a response of  `{rx-ready:0}` as the arduino will be focused on wall timing. |