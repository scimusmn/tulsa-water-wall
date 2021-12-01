const Point = (x, y) => { return {x, y} };

const Distance = (a, b) => {
  return Math.sqrt(
    (a.x - b.x)**2 + (a.y - b.y)**2
  );
}


const Circle = (center, radius) =>
      { return {type: 'circle', center, radius} };
const RenderCircle = (ctx, circle) => {
  ctx.beginPath();
  const { x, y } = circle.center;
  ctx.arc(x, y, circle.radius, 0, 2*Math.PI);
  ctx.fill();
}

const Line = (p0, p1) => {type: 'line', p0, p1};
const Rectangle = (a, b) => {type: 'rectangle', a, b};
