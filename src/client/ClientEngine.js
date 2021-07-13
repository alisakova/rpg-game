import EventSourceMixin from '../common/EventSourceMixin';

class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: [],
      images: [],
    });

    this.ctx = canvas.getContext('2d');
    this.loop = this.loop.bind(this);
  }

  start() {
    this.loop();
  }

  loop(timestamp) {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.trigger('render', timestamp);
    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop);
  }

  loadSprites(spriteGroup) {
    this.imageLoaders = [];
    Object.keys(spriteGroup).forEach((groupName) => {
      const group = spriteGroup[groupName];
      this.sprites[groupName] = group;

      Object.keys(group).forEach((spriteName) => {
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      });
    });

    return Promise.all(this.imageLoaders);
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const image = new Image();
      this.images[url] = image;
      image.onload = () => resolve(image);
      image.src = url;
    });
  }

  renderSpriteFrame({
    sprite, frame, x, y, width, height,
  }) {
    const spriteConfig = this.sprites[sprite[0]][sprite[1]];
    const [fx, fy, fw, fh] = spriteConfig.frames[frame];
    const img = this.images[spriteConfig.img];

    this.ctx.drawImage(img, fx, fy, fw, fh, x, y, width, height);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
