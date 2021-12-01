const waitForLine = (mouse) => {
  const { down } = mouse;
  
  if (down)
    return {
      currentShape: Polyline([Point(x, y)]),
    };
}


const drawLine = (mouse, currentShape, shapes) => {
  const { down, position } = mouse;
  
  if (down) {
    const { points } = currentShape;
    return {
      currentLine: [...points, position],
    };
  }
  else {
    return {
      mode: DrawingMode.PolylineIdle,
      shapes: [...shapes, shallowCopy(currentShape)],
      currentShape: { type: 'none', points: undefined },
    }
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const ShapesUpdate = (dock, state) => {
  const { canvas } = dock;
  const {
    mousePos, mouseDown,
    mode, shapes, currentShape
  } = state;

  switch(mode) {
  case DrawingMode.LineIdle:
    return handleLineIdle(mousePos, mouseDown);

  case DrawingMode.LineDrawing:
    return handleLineDraw(mousePos, mouseDown, currentShape, shapes);

  case DrawingMode.CircleIdle:
    return handleCircleIdle(mousePos, mouseDown);

  case DrawingMode.CircleDrawing:
    return handleCircleDraw(mousePos, mouseDown, currentShape, shapes);

  case DrawingMode.RectangleIdle:
    return handleRectangleIdle(mousePos, mouseDown);

  case DrawingMode.RectangleDrawing:
    return handleRectangleDraw(mousePos, mouseDown, currentShape, shapes);

  case DrawingMode.PolylineIdle:
    return handlePolylineIdle(mousePos, mouseDown);

  case DrawingMode.PolylineDrawing:
    return handlePolylineDraw(mousePos, mouseDown, currentShape, shapes);


  default:
    return;
  }
}
