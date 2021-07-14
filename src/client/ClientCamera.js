import MovableObject from '../common/MovableObject';

class ClientCamera extends MovableObject {
  constructor(cfg) {
    super(cfg);

    Object.assign(this, {
      cfg,
      width: cfg.canvas.width,
      height: cfg.canvas.height,
    }, cfg);
  }

  focusAtGameObject(obj) {
    const position = obj.worldPosition(50, 50);
    this.moveTo(position.x - this.width / 2, position.y - this.height / 2, false);
  }
}

export default ClientCamera;
