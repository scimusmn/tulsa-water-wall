const COLOR_NEG = { r: 255, g: 255, b: 255 };
const COLOR_POS = { r: 70, g: 150, b: 255 };

// convert RGB object (as above) to CSS string
const color2str = color => {
  return `rgb(${color.r},${color.g},${color.b})`;
}

// draw a singly poly-line
const RenderLine = (ctx, line, flipped) => {
  const { points } = line;
  if (points.length < 2)
    // this is not an actual line yet
    return;

  // if we're flipped, negative and positive are reversed
  const pos = flipped ? COLOR_NEG : COLOR_POS;
  const neg = flipped ? COLOR_POS : COLOR_NEG;

  ctx.strokeStyle = color2str(line.negative ? neg : pos);

  // draw the line
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i=1; i<points.length; i++) {
    const { x, y } = points[i];
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}


const RenderCanvas = (dock, state) => {
  const { canvas, ctx } = dock;
  const { line, lines, flipped } = state;

  ctx.lineWidth = 60;
  ctx.lineCap = 'round';
  // if we're flipped, bgcolor is positive
  ctx.fillStyle = color2str(flipped ? COLOR_POS : COLOR_NEG);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // render each stored line
  lines.forEach(line => RenderLine(ctx, line, flipped));
  // render the line we're currently drawing
  RenderLine(ctx, line, flipped);
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// construct the array-of-arrays we need to send to the server
const ExtractCanvasData = (dock, state) => {
  const { ctx, canvas } = dock;
  // extract raw pixel data from the canvas
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // helper function to get a specific pixel value from (x,y) coords
  const getPixel = (x, y) => {
    const rowOffset = canvas.width * Math.floor(y);
    const pixelIndex = rowOffset + Math.floor(x);
    const dataIndex = 4 * pixelIndex;
    return {
      r: pixels.data[dataIndex+0],
      g: pixels.data[dataIndex+1],
      b: pixels.data[dataIndex+2],
      a: pixels.data[dataIndex+3],
    };
  }

  // step size and offset across the pixel data
  const step = Math.floor(canvas.width/120);
  const offset = step/2;

  const data = [];

  // build up data
  for (let y = 0; y<80; y++) {
    const row = [];
    for (let x = 0; x<120; x++) {
      const px = getPixel((step*x)+offset, (step*y)+offset);
      if (px.r === COLOR_NEG.r
	  && px.g === COLOR_NEG.g
	  && px.b === COLOR_NEG.b) {
	// push false only if px[x, y] is exactly the negative color
	row.push(false);
      }
      else {
	// otherwise push true
	row.push(true);
      }
    }
    data.push(row);
  }

  return data;
}
