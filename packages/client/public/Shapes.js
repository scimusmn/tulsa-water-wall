const Point = (x, y) => { return {x, y} };

const Distance = (a, b) => {
  return Math.sqrt(
    (a.x - b.x)**2 + (a.y - b.y)**2
  );
}

const Circle = (center, radius) => {
  return {type: 'circle', center, radius};
}

const Line = (p0, p1) => {
  return {type: 'line', p0, p1};
}

const Rectangle = (p0, p1) => {
  return {type: 'rectangle', p0, p1};
}

const Polyline = (points) => {
  return {type: 'polyline', points};
}


const shallowCopy = object => {
  const copy = {};
  Object.keys(object).forEach(key => copy[key] = object[key]);
  return copy;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function enumeration(array) {
  const obj = {};
  array.forEach(value => obj[value] = value)
  return Object.freeze(obj);
}

const DrawingMode = enumeration([
  'LineIdle', 'LineDrawing',
  'CircleIdle', 'CircleDrawing',
  'RectangleIdle', 'RectangleDrawing',
  'PolylineIdle', 'PolylineDrawing',
]);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const handleLineIdle = (mousePos, mouseDown) => {
  const { x, y } = mousePos;

  if (mouseDown)
    return {
      mode: DrawingMode.LineDrawing,
      currentShape: Line(Point(x, y), Point(x, y)),
    };
}


const handleLineDraw = (mousePos, mouseDown, currentShape, shapes)  => {
  const { x, y } = mousePos;

  if (mouseDown) {
    const p0 = currentShape.p0;
    return {
      currentShape: Line(p0, Point(x, y)),
    };
  }
  else {
    return {
      mode: DrawingMode.LineIdle,
      shapes: [...shapes, shallowCopy(currentShape)],
      currentShape: { type: 'none', p0: undefined, p1: undefined },
    }
  }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const handleCircleIdle = (mousePos, mouseDown) => {
  const { x, y } = mousePos;

  if (mouseDown)
    return {
      mode: DrawingMode.CircleDrawing,
      currentShape: Circle(Point(x, y), 0),
    };
}

const handleCircleDraw = (mousePos, mouseDown, currentShape, shapes) => {
  if (mouseDown) {
    const radius = Distance(mousePos, currentShape.center);
    return {
      currentShape: Circle(currentShape.center, radius),
    }
  }
  else {
    return {
      mode: DrawingMode.CircleIdle,
      shapes: [...shapes, shallowCopy(currentShape)],
      currentShape: { type: 'none', center: undefined, radius: undefined },
    }
  }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const handleRectangleIdle = (mousePos, mouseDown) => {
  const { x, y } = mousePos;

  if (mouseDown)
    return {
      mode: DrawingMode.RectangleDrawing,
      currentShape: Rectangle(Point(x, y), Point(x, y)),
    };
}


const handleRectangleDraw = (mousePos, mouseDown, currentShape, shapes)  => {
  const { x, y } = mousePos;

  if (mouseDown) {
    const p0 = currentShape.p0;
    return {
      currentShape: Rectangle(p0, Point(x, y)),
    };
  }
  else {
    return {
      mode: DrawingMode.RectangleIdle,
      shapes: [...shapes, shallowCopy(currentShape)],
      currentShape: { type: 'none', p0: undefined, p1: undefined },
    }
  }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const handlePolylineIdle = (mousePos, mouseDown) => {
  const { x, y } = mousePos;
  
  if (mouseDown)
    return {
      mode: DrawingMode.PolylineDrawing,
      currentShape: Polyline([Point(x, y)]),
    };
}


const handlePolylineDraw = (mousePos, mouseDown, currentShape, shapes) => {
  const { x, y } = mousePos;
  
  if (mouseDown) {
    const { points } = currentShape;
    return {
      currentShape: Polyline([...points, Point(x, y)]),
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
