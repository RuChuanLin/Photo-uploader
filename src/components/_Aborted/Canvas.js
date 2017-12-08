import React, { Component } from 'react';
import StackBlur from 'stackblur-canvas';
import { connect } from 'react-redux';
import base64 from './img/base64';
class Canvas extends Component {
  componentWillReceiveProps = function() {
    var canvas = this.refs.canvas;
    let cctx = canvas.getContext('2d');
    console.log(cctx);
    // cctx.fillStyle = 'red';
    // cctx.fillRect(10, 10, 50, 50);
    let image = new Image();
    image.onload = function() {
      cctx.drawImage(image, 0, 0);
      var imgData = cctx.getImageData(0, 0, 500, 500);
      imgData = StackBlur.imageDataRGBA(imgData, 0, 0, 500, 500, 5);
      //   console.log(imgData);
      cctx.putImageData(imgData, 0, 0);
    };
    image.src = this.props.photo;
    // let image = new Image();
    // image.onload = function() {
    //   console.log(img);
    //   //   StackBlur.imageDataRGBA(img, 0, 0, 500, 500, 30);
    //   //   cctx.putImageData(img, 0, 0,0,0,500,500);

    //   cctx.drawImage(image, 0, 0);
    // };
    // image.src = base64;

    // let img = cctx.getImageData(0, 0, 500, 500);

    // cctx.putImageData(img, 0, 0, 500, 500, 500, 500);
  };

  //   componentDidUpdate = function() {
  //     var context = this.refs.canvas.getContext('2d');
  //     context.clearRect(0, 0, 200, 200);
  //     this.paint(context);
  //     StackBlur.canvasRGB(targetCanvas, top_x, top_y, width, height, radius);
  //   };

  render() {
    return <canvas width={500} height={500} ref="canvas" />;
  }
}

function mapStateToProps(state) {
  return {
    photo: state.photo
  };
}
export default connect(mapStateToProps)(Canvas);
