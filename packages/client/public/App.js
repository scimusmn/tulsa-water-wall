'use strict';

// unchanging document elements
const dock = {};


const AppInit = () => {
  // load document elements
  dock.canvas = document.getElementById('drawing-canvas');
  dock.canvas.width = window.innerWidth*2/3;
  dock.canvas.height = (2/3) * dock.canvas.width;
  dock.ctx = dock.canvas.getContext('2d');
}

/*  dock.buttonPolyline = document.getElementById('mode-polyline');

  dock.buttonUndo = document.getElementById('button-undo');
  dock.buttonNegative = document.getElementById('button-negative');
  dock.buttonClear = document.getElementById('button-clear');
  dock.buttonShare = document.getElementById('button-share');

  dock.sharingOverlay = document.getElementById('sharing-overlay');

  // attach event listeners
  dock.canvas.addEventListener('mousemove', e => {
    setState({
      mousePos: {
	x: e.offsetX,
	y: e.offsetY,
      }
    });
    AppUpdate();
  });

  document.addEventListener('mousedown', e => {
    setState({ mouseDown: true });
    AppUpdate();
  });

  document.addEventListener('mouseup', e => {
    setState({ mouseDown: false });
    AppUpdate();
  });


  // mode buttons
  dock.buttonPolyline.addEventListener('click', e => {
    setState({ mode: DrawingMode.PolylineIdle });
    AppUpdate();
  });

  dock.buttonNegative.addEventListener('click', e => {
    const { negative } = state.currentShape;
    setState({ currentShape: { negative: !negative } });
    AppUpdate();
  });


  // right buttons
  dock.buttonUndo.addEventListener('click', e => {
    const { shapes } = state;
    setState({
      shapes: shapes.slice(0, -2)
    });
    dock.buttonUndo.classList.add('buttonSelected');
    setTimeout(
      () =>
	dock.buttonUndo.classList.remove('buttonSelected'),
      100);
    AppUpdate();
  });

  dock.buttonClear.addEventListener('click', e => {
    setState({ shapes: [] });
    dock.buttonClear.classList.add('buttonSelected');
    setTimeout(
      () =>
	dock.buttonClear.classList.remove('buttonSelected'),
      100);
    AppUpdate();
  });

  dock.buttonShare.addEventListener('click', e => {
    const data = ExtractCanvasData(dock, state);
    console.log(data);
    const ws = new WebSocket('wss://localhost:8000');
    ws.onopen = () => { ws.send(JSON.stringify(data)); };
    setState({ sharing: true });
    setTimeout(() => setState({ sharing: false }), 10000);
  });

  // attach state listeners
  onStateUpdate('currentShape', () => RenderCanvas(dock, state));
  onStateUpdate('shapes', () => RenderCanvas(dock, state));

  onStateUpdate('mode', () => RenderModeButtons(dock, state));
  onStateUpdate('currentShape', () => RenderNegativeButton(dock, state));
  onStateUpdate('sharing', () => RenderShareButton(dock, state));

  // initial state
  setState({
    mousePos: Point(0, 0),
    mouseDown: false,

    mode: DrawingMode.RectangleIdle,
    currentShape: { type: 'none', negative: false },
    shapes: [],
  });
}


const AppUpdate = () => {
  let update;
  
  update = ShapesUpdate(dock, state);
  if (update) setState(update);
}

*/
window.onload = () => AppInit();
