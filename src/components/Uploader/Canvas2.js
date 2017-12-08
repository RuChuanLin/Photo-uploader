import React, { Component } from 'react';
import StackBlur from 'stackblur-canvas';
import { connect } from 'react-redux';
import base64 from './img/base64';
class Canvas2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mousedown: false,
      WIDTH: 50,
      HEIGHT: 500
    };
  }

  componentDidMount() {
    const { canvas } = this.refs;
    console.log(canvas.width);
    this.setState({ WIDTH: 500, HEIGHT: canvas.height }, console.log(this.state));
    
  }

  componentWillUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const { canvas_front } = this.refs;
    const ctx = canvas_front.getContext('2d');
    const image = new Image();
    image.src = this.props.photo;
    console.log(this.state);
    image.onload = () => {
      ctx.drawImage(image, 0, 0, this.state.WIDTH, this.state.HEIGHT);
      canvas_front.addEventListener('mousedown', e => {
        this.setState({ mousedown: true });
        console.log(this.state);
        let { x, y } = this.getMousePos(canvas_front, e);
        let size = 30;
        let xx = x - size / 2;
        let yy = y - size / 2;
        let imageData = ctx.getImageData(xx, yy, size, size);
        console.log(imageData);
        let filtered = StackBlur.imageDataRGBA(imageData, xx, yy, size, size); //add effect

        this.image_round(
          ctx,
          x,
          y,
          size,
          filtered,
          document.getElementById('canvas_front')
        );
      });
    };
  }

  getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  image_round(canvas, mouse_x, mouse_y, size, img_data, canvas_tmp) {
    let size_half = Math.round(size / 2);
    let ctx_tmp = canvas_tmp.getContext('2d');
    let xx = mouse_x - size_half;
    let yy = mouse_y - size_half;
    if (xx < 0) xx = 0;
    if (yy < 0) yy = 0;
    ctx_tmp.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
    ctx_tmp.save();

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
    canvas.drawImage(canvas_tmp, xx, yy, size, size, xx, yy, size, size);

    //reset
    ctx_tmp.restore();
    ctx_tmp.clearRect(0, 0, this.state.WIDTH, this.state.HEIGHT);
  }

  render() {
    return (
      <div id="canvas_wrapper">
        <canvas width={500} height={500} ref="canvas" />
        <canvas width={500} height={500} ref="canvas_front" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    photo: state.photo
  };
}
export default connect(mapStateToProps)(Canvas2);
