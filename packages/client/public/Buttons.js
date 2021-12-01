const RenderLeftButtons = (dock, state) => {
  const { buttonPolyline } = dock;
  const { mode, negative } = state;

  if (negative) {
    buttonPolyline.classList.remove('buttonSelected');
    buttonNegative.classList.add('buttonSelected');
  }
  else {
    buttonPolyline.classList.add('buttonSelected');
    buttonNegative.classList.remove('buttonSelected');
  }
}


const RenderRightButtons = (dock, state) => {
  const { buttonNegative, buttonShare } = dock;
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
