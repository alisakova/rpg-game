import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import levelConfig from '../configs/world.json';
import ClientWorld from './ClientWorld';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(config) {
    Object.assign(this, {
      config,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.config.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelConfig);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    const handlersOptions = [
      { eventName: 'ArrowLeft', position: { x: -1, y: 0 } },
      { eventName: 'ArrowRight', position: { x: 1, y: 0 } },
      { eventName: 'ArrowDown', position: { x: 0, y: 1 } },
      { eventName: 'ArrowUp', position: { x: 0, y: -1 } },
    ];
    const handlers = handlersOptions.reduce((result, handler) => ({
      ...result,
      [handler.eventName]: (keydown) => {
        if (keydown) {
          this.player.moveByCellCoord(handler.position.x, handler.position.y, (cell) => cell.findObjectsByType('grass').length);
        }
      },
    }), {});
    this.engine.input.onKey(handlers);
  }

  static init(config) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(config);
    }
  }
}

export default ClientGame;
