const COLOR_NEG = { r: 255, g: 255, b: 255 };
const COLOR_POS = { r: 70, g: 150, b: 255 };

const color2str = color => {
  return `rgb(${color.r},${color.g},${color.b})`;
}

const RenderLine = (ctx, line, flipped) => {
  const { points } = line;
  if (points.length < 2)
    return;

  const pos = flipped ? COLOR_NEG : COLOR_POS;
  const neg = flipped ? COLOR_POS : COLOR_NEG;

  ctx.strokeStyle = color2str(line.negative ? neg : pos);

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
  ctx.fillStyle = color2str(flipped ? COLOR_POS : COLOR_NEG);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  lines.forEach(line => RenderLine(ctx, line, flipped));
  RenderLine(ctx, line, flipped);
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const ExtractCanvasData = (dock, state) => {
  const { ctx, canvas } = dock;
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const getPixel = (x, y) => {
    const rowOffset = canvas.width * y;
    const pixelIndex = rowOffset + x;
    const dataIndex = 4 * pixelIndex;
    return {
      r: pixels.data[dataIndex+0],
      g: pixels.data[dataIndex+1],
      b: pixels.data[dataIndex+2],
      a: pixels.data[dataIndex+3],
    };
  }

  const step = Math.floor(canvas.width/120);
  const offset = step/2;

  const data = [];

  for (let y = 0; y<80; y++) {
    const row = [];
    for (let x = 0; x<120; x++) {
      const px = getPixel((step*x)+offset, (step*y)+offset);
      if (px.r === COLOR_NEG.r
	  && px.g === COLOR_NEG.g
	  && px.b === COLOR_NEG.b) {
	row.push(false);
      }
      else {
	row.push(true);
      }
    }
    data.push(row);
  }

  return data;
}
