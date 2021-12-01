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
  

  // register event listeners
  const on = (element, event, cb) => element.addEventListener(event, e => { cb(e); AppUpdate(); });

  on(dock.canvas, 'mousedown', e => setState({mouse: { down: true }}));
  on(dock.canvas, 'mouseup', e => setState({mouse: { down: false }}));
  on(dock.canvas, 'mousemove', e => {
    setState({
      mouse: { position: { x: e.offsetX, y: e.offsetY } }
    })
  });

  on(dock.drawButton, 'click', e => setState({ erasing: false }));
  on(dock.eraseButton, 'click', e => setState({ erasing: true }));

  const flash = button => {
    select(button);
    window.setTimeout(() => deselect(button), 100);
  }
  
  on(dock.undoButton, 'click', e => {
    const { lines } = state;
    setState({ lines: lines.slice(0, -1) });
    flash(dock.undoButton);
  });

  on(dock.flipButton, 'click', e => {
    const { flipped } = state;
    setState({ flipped: !flipped });
    if (flipped)
      deselect(dock.flipButton);
    else
      select(dock.flipButton);
  });

  on(dock.clearButton, 'click', e => {
    setState({ lines: [], erasing: false, flipped: false });
    flash(dock.clearButton);
  });

  on(dock.shareButton, 'click', e => {
    const data = ExtractCanvasData(dock, state);
    console.log(data);
    const ws = new WebSocket('ws://192.168.1.101:8081/ws');
    ws.onopen(() => {
      ws.send(JSON.stringify(data));
    });
    setState({ sharing: true });
    window.setTimeout(
      () => setState({ sharing: false }), 1000
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
    if (line.points.length === 0) {
      update = {
	line: { negative: erasing, points: [{x, y}] },
      };
    }
    else {
      update = {
	line: { points: [...(line.points), {x, y}] }
      };
    }
  }
  else {
    if (line.points.length !== 0) {
      const { negative, points } = line;
      update = {
	line: { points: [] },
	lines: [...lines, { negative, points: [...points] } ],
      }
    }
  }

  if (update)
    setState(update);
}

window.onload = () => AppInit();
