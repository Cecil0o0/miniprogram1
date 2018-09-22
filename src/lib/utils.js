export default {
  calcCutArea({dx, dy, sx, sy}) {
    if (dx === dy) {
      if (dx === sx) {
        return {
          width: dx,
          height: dy
        }
      }
    } else {
      const base = dx > dy ? dx : dy
      if (base === dx) {
        if (dx === sx) {
          return {

          }
        }
      }
    }
  }
}
