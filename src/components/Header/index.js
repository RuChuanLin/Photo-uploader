import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/blurtool">blur</Link>
        <Link to="/cropper">crop</Link>
      </div>
    );
  }
}

export default withRouter(Header);
