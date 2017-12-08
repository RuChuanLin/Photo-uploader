import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/blurtool">link</Link>
      </div>
    );
  }
}

export default withRouter(Header);
