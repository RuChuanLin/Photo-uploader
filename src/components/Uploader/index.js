import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto, postPhoto } from '../../actions';
import PhotoList from './PhotoList';
import InputUrl from './InputUrl';
import InputLocal from './InputLocal';

import img from '../../img/line.png';

class Uploader extends Component {
  state = { originPhoto: this.props.photo };

  onDefaultClick = () => {
    this.props.uploadPhoto(img);
  };

  onPostClick = isNewPhoto => {
    this.props.postPhoto(this.props.photo, isNewPhoto);
  };

  onPatchClick = () => {
    this.props.patchPhoto(this.props.photo);
  };

  render() {
    const isNewPhoto = this.props.photoList.every(
      ({ id }) => id !== this.props.photo.id
    );

    return (
      <div>
        <PhotoList />
        <InputUrl />
        <InputLocal />
        <button onClick={this.onDefaultClick}>使用預設圖</button>
        <br />
        <img src={this.props.photo.dataURL} ref="image" />
        <br />
        <button onClick={this.onPostClick.bind(this, isNewPhoto)}>
          {isNewPhoto ? 'Save' : 'Update'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photo: state.photo,
  photoList: state.photoList
});

export default connect(mapStateToProps, {
  uploadPhoto,
  postPhoto
})(Uploader);
// export default Uploader;
