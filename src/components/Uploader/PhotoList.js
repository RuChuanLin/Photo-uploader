import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Menu,
  Header,
  Popup,
  Grid,
  Button,
  Container,
  Input
} from 'semantic-ui-react';
import { fetchPhoto, initPhotoList } from '../../actions';

class PhotoList extends Component {
  state = { height: '', width: '' };
  componentWillMount() {
    this.props.initPhotoList();
  }

  onFetchClick = (id, type) => {
    const { height, width } = this.state;
    this.props.fetchPhoto(id, type, { height, width });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Header>已儲存的圖片</Header>
        <Popup trigger={<Button>比例設定</Button>} flowing hoverable>
          <Container text>
            <Header>說明</Header>
            <p>您可以在此設定從Server回傳的圖片尺寸。</p>
            <p>您可以只設定高度或寬度，另一方會依圖片原始比例計算。</p>
            <p>當然也可以同時設定兩邊的比例。</p>
          </Container>
          <Grid columns={2}>
            <Grid.Column textAlign="center">
              <Header as="h4">高度</Header>
              <Input
                focus
                type="number"
                type="text"
                value={this.state.height}
                onChange={e => this.setState({ height: e.target.value })}
              />
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Header as="h4">寬度</Header>
              <Input
                focus
                type="text"
                value={this.state.width}
                onChange={e => this.setState({ width: e.target.value })}
              />
            </Grid.Column>
          </Grid>
        </Popup>
        {this.props.photoList.map(({ id, thumbnail, type }) => (
          <Menu compact icon="labeled" vertical key={id}>
            <Menu.Item
              onClick={() => this.onFetchClick(id, type)}
              active={id === this.props.photo.id}
            >
              <img key={id} src={thumbnail} alt="image" />
            </Menu.Item>
          </Menu>
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
