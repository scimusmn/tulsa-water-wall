'use strict';

// unchanging document elements
const dock = {};


const AppInit = () => {
  // load document elements
  load_dom();

  // setup canvas size
  const width = 0.7 * window.innerWidth;
  const height = 0.66 * width;
  dock.canvas.width = width;
  dock.canvas.height = height;
  

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //
  // register event listeners
  //
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // helper function to avoid forgetting to AppUpdate() after each event
  const on = (element, event, cb) => element.addEventListener(event, e => { cb(e); AppUpdate(); });

  // the mouse is only "down" if you click on the canvas
  on(dock.canvas, 'mousedown', e => setState({mouse: { down: true }}));
  // but it can go "up" anywhere, in order to avoid awkwardly having drawings
  // stop working when you try to draw near the edge of the screen.
  on(document, 'mouseup', e => setState({mouse: { down: false }}));
  // register mouse movement over the canvas
  on(dock.canvas, 'mousemove', e => {
    setState({
      mouse: { position: { x: e.offsetX, y: e.offsetY } }
    })
  });

  // draw/erase button events
  on(dock.drawButton, 'click', e => setState({ erasing: false }));
  on(dock.eraseButton, 'click', e => setState({ erasing: true }));

  // briefly flash a button as selected
  const flash = button => {
    select(button);
    window.setTimeout(() => deselect(button), 100);
  }

  // undo button
  on(dock.undoButton, 'click', e => {
    const { lines } = state;
    setState({ lines: lines.slice(0, -1) });
    flash(dock.undoButton);
  });

  // flip button
  on(dock.flipButton, 'click', e => {
    const { flipped } = state;
    setState({ flipped: !flipped });
    if (flipped)
      deselect(dock.flipButton);
    else
      select(dock.flipButton);
  });

  // clear button
  on(dock.clearButton, 'click', e => {
    setState({ lines: [], erasing: false, flipped: false });
    flash(dock.clearButton);
  });

  // share button
  on(dock.shareButton, 'click', e => {
    // get the array-of-arrays-of-bools from the canvas
    const data = ExtractCanvasData(dock, state);
    const ws = new WebSocket('ws://192.168.25.101:8081/ws');
    ws.onopen = () => {
      // transmit array-of-arrays to the server.
      ws.send(JSON.stringify(data));
    };
    // display the sharing overlay for a brief moment,
    // in order to prevent spamming the share button
    setState({ sharing: true });
    window.setTimeout(
      () => setState({ sharing: false }), 5000
    )
  });

  // attach state listeners
  onStateUpdate('erasing', () => RenderLeftButtons(dock, state));
  onStateUpdate('flipped', () => RenderRightButtons(dock, state));
  onStateUpdate('sharing', () => RenderRightButtons(dock, state));
  onStateUpdate('sharing', () => RenderOverlay(dock, state));
  onStateUpdate('line',    () => RenderCanvas(dock, state));
  onStateUpdate('lines',   () => RenderCanvas(dock, state));
  onStateUpdate('flipped', () => RenderCanvas(dock, state));

  // set initial state
  setState({
    mouse: {
      position: { x:0, y:0 },
      down: false,
    },
    erasing: false,
    flipped: false,
    line: { negative: false, points: [] },
    lines: [],
  });
}  



const AppUpdate = () => {
  let update;
  
  const { mouse, line, lines, erasing } = state;
  const { down, position } = mouse;
  const { x, y } = position;

  if (down) {
    if (line.points.length === 0) { // a new line is just starting
      update = {
	line: { negative: erasing, points: [{x, y}, {x, y}] },
      };
    }
    else { // we're already drawing a line
      update = {
	line: { points: [...(line.points), {x, y}] }
      };
    }
  }
  else {
    if (line.points.length !== 0) { // we just finished a line
      const { negative, points } = line;
      update = {
	line: { points: [] },
	lines: [...lines, { negative, points: [...points] } ],
      }
    }
  }

  // update the state based on our drawing changes.
  if (update)
    setState(update);
}


// run AppInit() when we first load
window.onload = () => AppInit();
