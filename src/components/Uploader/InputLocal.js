import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhotoLocally } from '../../actions';

class InputLocal extends Component {
  state = { dataURL: '', type: '' };

  onInputChange = async e => {
    console.log(e.target.files[0]);
    const type = e.target.files[0].type.split('/')[1];
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener(
      'load',
      () => {
        this.setState({ dataURL: reader.result, type });
        this.props.uploadPhotoLocally(this.state);
      },
      false
    );
  };
  render() {
    return (
      <form>
        <h3>本地上傳</h3>
        <input type="file" onChange={this.onInputChange} />
      </form>
    );
  }
}

export default connect(null, { uploadPhotoLocally })(InputLocal);
