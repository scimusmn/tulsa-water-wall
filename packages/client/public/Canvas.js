const COLOR_NEG = { r: 70, g: 150, b: 255 };
const COLOR_POS = { r: 255, g: 255, b: 255 };

const color2str = color => {
  return `rgb(${color.r},${color.g},${color.b})`;
}

const RenderLine = (ctx, line) => {
  ctx.beginPath();

  const x0 = line.p0.x;
  const y0 = line.p0.y;
  ctx.moveTo(x0, y0);

  const x1 = line.p1.x;
  const y1 = line.p1.y;
  ctx.lineTo(x1, y1);
  ctx.stroke();
}


const RenderCircle = (ctx, circle) => {
  ctx.beginPath();
  const { x, y } = circle.center;
  ctx.arc(x, y, circle.radius, 0, 2*Math.PI);
  ctx.fill();
}


const RenderRectangle = (ctx, rectangle) => {
  const { x, y } = rectangle.p0;
  const width = rectangle.p1.x - x;
  const height = rectangle.p1.y - y;

  ctx.fillRect(x, y, width, height);
}


const RenderPolyline = (ctx, polyline) => {
  const { points } = polyline;

  if (points.length < 2)
    return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  
  for (let i=1; i<points.length; i++) {
    const { x, y } = points[i];
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}


const RenderShape = (ctx, shape) => {
  if (shape.negative) {
    ctx.fillStyle = color2str(COLOR_NEG);
    ctx.strokeStyle = color2str(COLOR_NEG);
  }
  else {
    ctx.fillStyle = color2str(COLOR_POS);
    ctx.strokeStyle = color2str(COLOR_POS);
  }
  
  switch (shape.type) {
  case 'line':
    RenderLine(ctx, shape);
    break;

  case 'circle':
    RenderCircle(ctx, shape);
    break;

  case 'rectangle':
    RenderRectangle(ctx, shape);
    break;

  case 'polyline':
    RenderPolyline(ctx, shape);
    break;    

  default:
    //do nothing
    break;
  }
}


const RenderCanvas = (dock, state) => {
  const { canvas, ctx } = dock;
  const { currentShape, shapes } = state;

  ctx.lineWidth = 60;
  ctx.lineCap = 'round';
  ctx.fillStyle = color2str(COLOR_NEG);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  shapes.forEach(shape => RenderShape(ctx, shape));
  RenderShape(ctx, currentShape);
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
