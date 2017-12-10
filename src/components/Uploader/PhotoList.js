import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchPhoto } from '../../actions';

class PhotoList extends Component {
  state = { list: [] };

  componentWillMount() {
    axios.get(`http://localhost:3000/photoes`).then(({ data }) => {
      this.setState({ list: data });
    });
  }

  onFetchClick = (id, type) => {
    this.props.fetchPhoto(id, type);
  };

  render() {
    return (
      <div>
        {this.state.list.map(({ id, thumbnail, type }) => (
          <img
            key={id}
            src={thumbnail}
            alt="image"
            onClick={() => this.onFetchClick(id, type)}
          />
        ))}
      </div>
    );
  }
}

export default connect(null, { fetchPhoto })(PhotoList);
