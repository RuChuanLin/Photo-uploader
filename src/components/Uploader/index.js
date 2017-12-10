import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto, postPhoto } from '../../actions';
import PhotoList from './PhotoList';
import img from '../../img/sakura_flowers-wallpaper-1920x1080.jpg';

class Uploader extends Component {
  state = { originPhoto: this.props.photo, photoList: [] };

  onDefaultClick = () => {
    this.props.uploadPhoto(img);
  };

  onPostClick = () => {
    this.props.postPhoto(this.props.photo);
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <PhotoList />
        <button onClick={this.onDefaultClick}>使用預設圖</button>
        <br />
        <img src={this.props.photo.dataURL} ref="image" />
        <br />
        <button onClick={this.onPostClick.bind(this)}>Save</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { photo: state.photo };
}

export default connect(mapStateToProps, { uploadPhoto, postPhoto })(Uploader);
// export default Uploader;
