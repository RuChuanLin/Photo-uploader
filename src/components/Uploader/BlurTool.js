import React, { Component } from 'react';
import { connect } from 'react-redux';
import StackBlur from 'stackblur-canvas';
import { Link } from 'react-router-dom';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import { uploadPhoto, updatePhoto } from '../../actions';
import Photo from '../../model/Photo';

class BlurTool extends Component {
  state = {
    isMousedown: false,
    WIDTH: 0,
    HEIGHT: 0,
    photo: this.props.photo.dataURL
  };
  componentDidMount() {
    const { canvas } = this.refs;
    this.setState({ WIDTH: canvas.width, HEIGHT: canvas.height });
    const ctx = canvas.getContext('2d');
    const image = new window.Image();
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
    // this.refs.canvas_test.getContext('2d').putImageData(filtered, 0, 0);

    ctx_front.putImageData(filtered, xx, yy);

    ctx_front.globalCompositeOperation = 'destination-in';

    ctx_front.fillStyle = '#ffffff';
    ctx_front.beginPath();
    ctx_front.arc(x, y, size_half, 0, 2 * Math.PI, true);
    ctx_front.fill();

    ctx.drawImage(canvas_front, xx, yy, size, size, xx, yy, size, size);
  }

  onSubmitClick = () => {
    const { canvas } = this.refs;
    const newPhoto = this.props.photo;
    newPhoto.dataURL = canvas.toDataURL(`image/${this.props.photo.type}`);

    this.props.updatePhoto(newPhoto);
    this.props.history.push('/edit');
  };

  render() {
    const { width, height } = this.props.photo;
    return (
      <Grid>
        <Grid.Column computer={16}>
          <Grid.Column computer={16}>
            <Link to="/edit">
              <Button positive onClick={this.onSubmitClick.bind(this)}>
                輯編完成！
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Column>
        <Grid.Column computer={1} />

        <Grid.Column computer={10}>
          <Header>編輯區</Header>
          <div id="canvas_wrapper" style={{ height: height }}>
            <canvas width={width} height={height} ref="canvas" />
            <canvas
              width={width}
              height={height}
              ref="canvas_front"
              onMouseDown={() => this.setState({ isMousedown: true })}
              onMouseUp={() => this.setState({ isMousedown: false })}
              onMouseMove={e => this.state.isMousedown && this.blurPhoto(e)}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({ photo: state.photo });

export default connect(mapStateToProps, { uploadPhoto, updatePhoto })(BlurTool);
