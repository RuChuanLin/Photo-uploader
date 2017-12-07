import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../actions';

class InputUrl extends Component {
  state = {
    photoUrl: ''
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.uploadPhoto(this.state.photoUrl);
  };

  onInputChange = value => {
    this.setState({ photoUrl: value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h3>Upload through URL</h3>
        <input
          value={this.state.photoUrl}
          onChange={e => this.onInputChange(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    photo: state.photo
  };
}

export default connect(mapStateToProps, { uploadPhoto })(InputUrl);
