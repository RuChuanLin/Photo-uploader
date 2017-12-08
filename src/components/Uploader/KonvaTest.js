import React, { Component } from 'react';
import Konva, { Layer, Rect, Stage, Group } from 'react-konva';
import { Image } from 'konva';
class KonvaTest extends Component {
  state = { image: null, height: 0, width: 0, isDrawing: false };
  componentWillMount() {
    const image = new window.Image();
    image.src =
      'https://organicfit.tv/wp-content/uploads/2017/10/istock-499609170.jpg';
    image.onload = e => {
      console.log(e);
      this.setState({
        image,
        height: e.path['0'].height,
        width: e.path['0'].width
      });
    };
  }
  componentDidMount() {
    var abc = new Image({
      image:
        'https://organicfit.tv/wp-content/uploads/2017/10/istock-499609170.jpg',
      x: 280,
      y: 30,
      width: 60,
      height: 80
    });
    console.log(abc.image());
    this.refs.test.setImage(abc);
  }
  UpdateKonva(e) {
    const { KonvaImage } = this.refs;
    let [x, y] = [
      e.evt.clientX - KonvaImage.attrs.x,
      e.evt.clientY - KonvaImage.attrs.y
    ];
    let size = 30;
    let xx = x - size / 2;
    let yy = y - size / 2;
    var abc = new Image({
      image: KonvaImage,
      x: 280,
      y: 30,
      width: 60,
      height: 80
    });
    this.refs.test.setImage(abc);
    console.log(abc);
    // let imageData = KonvaImage.getImageData(xx, yy, size, size);
    // console.log(imageData);
    // let filtered = StackBlur.imageDataRGBA(imageData, xx, yy, size, size); //add effect

    // this.image_round(
    //   ctx,
    //   x,
    //   y,
    //   size,
    //   filtered,
    //   document.getElementById('canvas_front')
    // );
  }

  getMousePos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  render() {
    console.log(this.state.isDrawing);
    return (
      <Group>
        <Konva.Image ref="test" />
        {/* <Konva.Image
          ref="KonvaImage"
          x={50}
          y={50}
          height={this.state.height}
          width={this.state.width}
          image={this.state.image}
          onMouseDown={() => this.setState({ isDrawing: true })}
          onMouseUp={() => this.setState({ isDrawing: false })}
          onMouseMove={
            this.state.isDrawing && (e => this.UpdateKonva.bind(this)(e))
          }
        /> */}
      </Group>
    );
  }
}

export default KonvaTest;
