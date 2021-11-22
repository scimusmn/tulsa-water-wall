const RenderModeButtons = (dock, state) => {
  const { buttonLine, buttonCircle, buttonRectangle, buttonPolyline } = dock;
  const { mode } = state;

  switch (mode) {
  case DrawingMode.LineIdle:
  case DrawingMode.LineDrawing:
    buttonLine.classList.add('buttonSelected');
    buttonCircle.classList.remove('buttonSelected');
    buttonRectangle.classList.remove('buttonSelected');
    buttonPolyline.classList.remove('buttonSelected');
    break;

  case DrawingMode.CircleIdle:
  case DrawingMode.CircleDrawing:
    buttonLine.classList.remove('buttonSelected');
    buttonCircle.classList.add('buttonSelected');
    buttonRectangle.classList.remove('buttonSelected');
    buttonPolyline.classList.remove('buttonSelected');
    break;

  case DrawingMode.RectangleIdle:
  case DrawingMode.RectangleDrawing:
    buttonLine.classList.remove('buttonSelected');
    buttonCircle.classList.remove('buttonSelected');
    buttonRectangle.classList.add('buttonSelected');
    buttonPolyline.classList.remove('buttonSelected');
    break;

  case DrawingMode.PolylineIdle:
  case DrawingMode.PolylineDrawing:
    buttonLine.classList.remove('buttonSelected');
    buttonCircle.classList.remove('buttonSelected');
    buttonRectangle.classList.remove('buttonSelected');
    buttonPolyline.classList.add('buttonSelected');
    break;    

  default:
    break;
  }
}


const RenderNegativeButton = (dock, state) => {
  const { buttonNegative } = dock;
  const { currentShape } = state;
  const { negative } = currentShape;

  if (negative)
    buttonNegative.classList.add('buttonSelected');
  else
    buttonNegative.classList.remove('buttonSelected');
}


const RenderShareButton = (dock, state) => {
  const { buttonShare, sharingOverlay } = dock;
  const { sharing } = state;

  if (sharing) {
    buttonShare.classList.add('buttonSelected');
    sharingOverlay.classList.remove('hidden');
  }
  else {
    buttonShare.classList.remove('buttonSelected');
    sharingOverlay.classList.add('hidden');
  }
}
