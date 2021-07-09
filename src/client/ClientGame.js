import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import levelConfig from '../configs/world.json';
import ClientWorld from './ClientWorld';

class ClientGame {
  constructor(config) {
    Object.assign(this, {
      config,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.config.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelConfig);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', () => {
        this.map.init();
      });
      this.engine.start();
    });
  }

  static init(config) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(config);
    }
  }
}

export default ClientGame;
