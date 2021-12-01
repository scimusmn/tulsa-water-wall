const $ = id => document.getElementById(id);

function load_dom() {
  // load document elements
  dock.sharingOverlay = $('sharing-overlay');
  dock.mainContent = $('main-content');
  
  dock.canvas = $('drawing-canvas');
  dock.ctx = dock.canvas.getContext('2d');

  dock.drawButton = $('button-draw');
  dock.eraseButton = $('button-erase');

  dock.undoButton = $('button-undo');
  dock.flipButton = $('button-flip');
  dock.clearButton = $('button-clear');
  dock.shareButton = $('button-share');
}


function select(button) {
  button.classList.add('selected');
}

function deselect(button) {
  button.classList.remove('selected');
}

const RenderLeftButtons = (dock, state) => {
  const { drawButton, eraseButton } = dock;
  const { erasing } = state;

  if (erasing) {
    deselect(drawButton);
    select(eraseButton);
  }
  else {
    select(drawButton);
    deselect(eraseButton);
  }
}


const RenderRightButtons = (dock, state) => {
  const { flipButton, shareButton } = dock;
  const { flipped, sharing } = state;

  if (flipped)
    select(flipButton);
  else
    deselect(flipButton);

  if (sharing)
    select(shareButton);
  else
    deselect(shareButton);
}


const RenderOverlay = (dock, state) => {
  const { sharingOverlay, mainContent } = dock;
  const { sharing } = state;

  if (sharing) {
    sharingOverlay.classList.remove('hidden');
    mainContent.classList.add('blurred');
  }
  else {
    sharingOverlay.classList.add('hidden');
    mainContent.classList.remove('blurred');
  }
}
