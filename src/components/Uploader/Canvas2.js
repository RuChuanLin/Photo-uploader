import React, { Component } from 'react';
import StackBlur from 'stackblur-canvas';
import { connect } from 'react-redux';
import base64 from './img/base64';
class Canvas extends Component {
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    const { canvas } = this.refs;
    const ctx = canvas.getContext('2d');
    canvas.onMouseDown = e=>{
      console.log(2342);
    }
  }
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
