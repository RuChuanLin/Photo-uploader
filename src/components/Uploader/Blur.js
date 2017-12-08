import React, { Component } from 'react';
import { connect } from 'react-redux';
import StackBlur from 'stackblur-canvas';

class Blur extends Component {
  state = {
    mousedown: false,
    WIDTH: 0,
    HEIGHT: 0,
    photo: this.props.photo
  };

  componentDidMount() {
    let { canvas } = this.refs;
    this.setState(
      { WIDTH: canvas.width, HEIGHT: canvas.height },
      console.log(this.state)
    );
    // canvas.getContext('2d').putImageData(this.props.photo, 0, 0);
  }
  componentWillUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    let { photo } = this.props;
    let { canvas, canvas_front } = this.refs;
    let ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = photo;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, this.state.WIDTH, this.state.HEIGHT);
      canvas_front.addEventListener('mousemove', e => {
        if (this.state.mousedown) {
          let { x, y } = this.getMousePos(canvas_front, e);
          let size = 30;
          let xx = x - size / 2;
          let yy = y - size / 2;
          let imageData = ctx.getImageData(xx, yy, size, size);
          let filtered = StackBlur.imageDataRGBA(
            imageData,
            xx,
            yy,
            size,
            size,
            30
          );
          this.refs.canvas_test.getContext('2d').putImageData(filtered, 0, 0);
          this.image_round(ctx, x, y, size, filtered, this.refs.canvas_front);
        }
      });
      canvas_front.addEventListener('mousedown', e => {
        this.setState({ mousedown: true });
      });
      canvas_front.addEventListener('mouseup', e => {
        this.setState({ mousedown: false });
      });
    };
  }
  getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

//   this.image_round(ctx, x, y, size, filtered, this.refs.canvas_front);
  image_round(canvas, mouse_x, mouse_y, size, img_data, canvas_tmp) {
    let size_half = Math.round(size / 2);
    let ctx_tmp = canvas_tmp.getContext('2d');
    let xx = mouse_x - size_half;
    let yy = mouse_y - size_half;
    if (xx < 0) xx = 0;
    if (yy < 0) yy = 0;
    // ctx_tmp.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
    // ctx_tmp.save();

    ctx_tmp.putImageData(img_data, xx, yy);

    ctx_tmp.globalCompositeOperation = 'destination-in';

    //create form
    ctx_tmp.fillStyle = '#ffffff';
    ctx_tmp.beginPath();
    ctx_tmp.arc(mouse_x, mouse_y, size_half, 0, 2 * Math.PI, true);
    ctx_tmp.fill();
    //draw final data
    if (xx + size > this.state.WIDTH) size = this.state.WIDTH - xx;
    if (yy + size > this.state.HEIGHT) size = this.state.HEIGHT - yy;
    this.refs.canvas
      .getContext('2d')
      .drawImage(canvas_tmp, xx, yy, size, size, xx, yy, size, size);
    //reset
    ctx_tmp.restore();
    ctx_tmp.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
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
            
          />
          <div>
            <canvas width={50} height={50} ref="canvas_test" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    photo: state.photo
  };
}

export default connect(mapStateToProps)(Blur);
