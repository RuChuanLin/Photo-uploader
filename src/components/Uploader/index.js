import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../actions';
import img from '../../img/sakura_flowers-wallpaper-1920x1080.jpg';
class Uploader extends Component {
  componentDidUpdate() {
    const { image } = this.refs;
    console.log(image.height, image.width);
  }
  render() {
    return (
      <div>
        <button onClick={() => this.props.uploadPhoto(img)}>使用預設圖</button>
        <br />
        <img src={this.props.photo} ref="image" />
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { photo: state.photo };
}

export default connect(mapStateToProps, { uploadPhoto })(Uploader);
// export default Uploader;
