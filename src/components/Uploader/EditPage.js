import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postPhoto, updatePhoto } from '../../actions';
import { Grid, Image, Header, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Photo from '../../model/Photo';

class EditPage extends Component {
  state = {
    originPhoto: this.props.photo.dataURL
  };
  onPostPhoto(isNewPhoto) {
    this.props.postPhoto(this.props.photo, isNewPhoto);
    this.props.history.push('/');
  }

  render() {
    const isNewPhoto = this.props.photoList.every(
      ({ id }) => id !== this.props.photo.id
    );

    return (
      <Grid>
        <Grid.Column computer={16}>
          <Grid.Column computer={16}>
            <Button
              color={isNewPhoto ? 'green' : 'orange'}
              onClick={() => this.onPostPhoto(isNewPhoto)}
            >
              {isNewPhoto
                ? '點擊後送出資料(將會新增一張圖片)'
                : '點擊後送出資料(將更新Server中既有圖片)'}
            </Button>
          </Grid.Column>
        </Grid.Column>
        <Grid.Column computer={4}>
          <Grid.Column mobile={16} computer={4}>
            <Link to={`${this.props.match.url}/cropper`}>
              <Button>裁切</Button>
            </Link>
          </Grid.Column>
          <Grid.Column mobile={16} computer={4}>
            <Link to={`${this.props.match.url}/blur`}>
              <Button>打碼</Button>
            </Link>
          </Grid.Column>
        </Grid.Column>
        <Grid.Column computer={10}>
          <Header>圖片預覽</Header>
          <Image
            src={this.props.photo.dataURL}
            height={this.props.photo.height}
            alt="請選擇任一方式載入圖片"
            verticalAlign="middle"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  photo: state.photo,
  photoList: state.photoList
});

export default connect(mapStateToProps, { postPhoto, updatePhoto })(EditPage);
