import React, { Component } from 'react';
import { connect } from 'react-redux';
class Uploader extends Component {
  render() {
    if (!this.props.photo) {
      return <div>Loading...</div>;
    }
    return <div>123</div>;
  }
}

function mapStateToProps(state) {
  return { photo: state.photo };
}

export default connect(mapStateToProps)(Uploader);
