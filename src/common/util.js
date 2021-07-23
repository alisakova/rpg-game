export default function clamp(x, fromX, toX) {
  let xPosition = x;
  if (x < fromX) {
    xPosition = fromX;
  }
  if (x > toX) {
    xPosition = toX;
  }

  return xPosition;
}
