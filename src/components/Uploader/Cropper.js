import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { updatePhoto } from '../../actions/index';
import { connect } from 'react-redux';
import StackBlur from 'stackblur-canvas';
import Photo from '../../model/Photo';

class Crop extends Component {
  constructor(props) {
    super(props);
    this.state = { dataURL: this.props.photo.dataURL };
    this._crop = this._crop.bind(this);
  }

  _crop() {
    this.setState({
      dataURL: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  }
  onCropClick() {
    const newPhoto = this.props.photo;
    newPhoto.dataURL = this.state.dataURL;
    this.props.updatePhoto(newPhoto);
  }
  render() {
    const { height, width } = this.props.photo;
    return (
      <div style={{ height: height }}>
        <Cropper
          style={{
            height: '100%',
            width: width,
            maxWidth: 900,
            display: 'inline-block',
            float: 'left'
          }}
          ref="cropper"
          src={this.props.photo.dataURL}
          crop={this._crop}
          guides={false}
          viewMode={1}
          modal={false}
          dragMode="move"
        />

        <div
          style={{
            display: 'inline-block',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <button onClick={() => this.onCropClick()}>OK</button>
          <h3>Preview</h3>
          <img src={this.state.dataURL} alt="image" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { photo: state.photo };
}

export default connect(mapStateToProps, { updatePhoto })(Crop);
