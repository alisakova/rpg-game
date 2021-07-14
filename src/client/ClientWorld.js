import PositionedObject from '../common/PositionedObject';
import ClientCell from './ClientCell';

class ClientWorld extends PositionedObject {
  constructor(game, engine, levelConfig) {
    super();

    const worldHeight = levelConfig.map.length;
    const worldWidth = levelConfig.map[0].length;
    const cellSize = engine.canvas.height / levelConfig.camera.height;

    Object.assign(this, {
      game,
      engine,
      levelConfig,
      worldHeight,
      worldWidth,
      cellWidth: cellSize,
      cellHeight: cellSize,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      map: [],
    });
  }

  init() {
    const {
      levelConfig,
      map,
      worldWidth,
      worldHeight,
    } = this;

    for (let row = 0; row < worldHeight; row += 1) {
      for (let col = 0; col < worldWidth; col += 1) {
        if (!map[row]) {
          map[row] = [];
        }

        map[row][col] = new ClientCell({
          world: this,
          cellCol: col,
          cellRow: row,
          cellCfg: levelConfig.map[row][col],
        });
      }
    }
  }

  render(time) {
    const { map, worldWidth, worldHeight } = this;
    for (let row = 0; row < worldHeight; row += 1) {
      for (let col = 0; col < worldWidth; col += 1) {
        map[row][col].render(time);
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}

export default ClientWorld;
