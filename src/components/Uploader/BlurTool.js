import React, { Component } from 'react';
import StackBlur from 'stackblur-canvas';

class BlurTool extends Component {
  state = {
    isMousedown: false,
    WIDTH: 0,
    HEIGHT: 0,
    photo: this.props.photo
  };
  componentDidMount() {
    const { canvas } = this.refs;
    this.setState({ WIDTH: canvas.width, HEIGHT: canvas.height });
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = this.state.photo;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, this.state.WIDTH, this.state.HEIGHT);
    };
  }
  blurPhoto(e) {
    const { canvas_front, canvas } = this.refs;
    const [ctx_front, ctx] = [
      canvas_front.getContext('2d'),
      canvas.getContext('2d')
    ];
    const rect = canvas_front.getBoundingClientRect();
    const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];
    const size = 30;
    const size_half = Math.round(size / 2);
    const xx = x > size ? x - size / 2 : 0;
    const yy = y > size ? y - size / 2 : 0;
    const imageData = ctx.getImageData(xx, yy, size, size);
    const filtered = StackBlur.imageDataRGBA(imageData, xx, yy, size, size, 30);
    this.refs.canvas_test.getContext('2d').putImageData(filtered, 0, 0);

    ctx_front.putImageData(filtered, xx, yy);

    ctx_front.globalCompositeOperation = 'destination-in';

    ctx_front.fillStyle = '#ffffff';
    ctx_front.beginPath();
    ctx_front.arc(x, y, size_half, 0, 2 * Math.PI, true);
    ctx_front.fill();

    ctx.drawImage(canvas_front, xx, yy, size, size, xx, yy, size, size);
  }

  render() {
    return (
      <div>
        <div id="canvas_wrapper">
          <canvas width={500} height={500} ref="canvas" />
          <canvas
            width={500}
            height={500}
            ref="canvas_front"
            onMouseDown={() => this.setState({ isMousedown: true })}
            onMouseUp={() => this.setState({ isMousedown: false })}
            onMouseMove={e => this.state.isMousedown && this.blurPhoto(e)}
          />
          <div>
            <canvas width={50} height={50} ref="canvas_test" />
          </div>
        </div>
      </div>
    );
  }
}

export default BlurTool;
