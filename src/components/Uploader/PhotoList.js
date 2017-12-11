import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchPhoto, initPhotoList } from '../../actions';

class PhotoList extends Component {
  componentWillMount() {
    this.props.initPhotoList();
  }

  componentWillUpdate() {
    console.log(this.props.photo);
    if (!this.props.photo) {
      return;
    }
    // this.state.list.push(this.props.photo.getPhotoData());
  }

  onFetchClick = (id, type) => {
    this.props.fetchPhoto(id, type);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.photoList.map(({ id, thumbnail, type }) => (
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

const mapStateToProps = state => ({
  photo: state.photo,
  photoList: state.photoList
});

export default connect(mapStateToProps, { fetchPhoto, initPhotoList })(
  PhotoList
);
