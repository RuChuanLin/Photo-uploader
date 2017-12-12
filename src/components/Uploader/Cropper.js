import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import { Link } from 'react-router-dom';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import { updatePhoto } from '../../actions/index';
import { connect } from 'react-redux';
import Photo from '../../model/Photo';

class Crop extends Component {
  constructor(props) {
    super(props);
    this.state = { dataURL: this.props.photo.dataURL };
    this._crop = this._crop.bind(this);
  }

  _crop() {
    this.setState({
      dataURL: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  }
  onCropClick() {
    const newPhoto = this.props.photo;
    newPhoto.dataURL = this.state.dataURL;
    this.props.updatePhoto(newPhoto);
    this.props.history.push('/edit');
  }
  render() {
    const { height, width } = this.props.photo;
    return (
      <Grid>
        <Grid.Column computer={16}>
          <Grid.Column computer={16}>
            <Link to="/edit">
              <Button positive onClick={this.onCropClick.bind(this)}>
                裁切完成！
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Column>
        <Grid.Column computer={1} />
        <Grid.Column computer={10}>
          <Header>編輯區</Header>
          <Cropper
            style={{
              height: '100%',
              width: width,
              maxWidth: 900,
              display: 'inline-block',
              float: 'left'
            }}
            ref="cropper"
            src={this.props.photo.dataURL}
            crop={this._crop}
            guides={false}
            viewMode={1}
            modal={false}
            dragMode="move"
          />
        </Grid.Column>
        <Grid.Column computer={3}>
          <Header>圖片預覽</Header>
          <img src={this.state.dataURL} alt="image" />
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { photo: state.photo };
}

export default connect(mapStateToProps, { updatePhoto })(Crop);
