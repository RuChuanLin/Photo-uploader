import React, { Component } from 'react';
import { connect } from 'react-redux';

import PhotoList from './PhotoList';
import InputUrl from './InputUrl';
import InputLocal from './InputLocal';
import Default from './Default';
import { Link } from 'react-router-dom';
import { Grid, Image, Header, Button } from 'semantic-ui-react';

class SelectPage extends Component {
  state = {};
  render() {
    const { dataURL } = this.props.photo;
    return (
      <div>
        <Grid>
          <Grid.Column computer={16}>
            <Grid.Column computer={16}>
              {dataURL ? (
                <Link to="/edit">
                  <Button positive>選擇好了，進入下一步！</Button>
                </Link>
              ) : (
                <Button disabled>請先載入圖片</Button>
              )}
            </Grid.Column>
          </Grid.Column>
          <Grid.Column computer={4}>
            <Grid.Column mobile={16} computer={4}>
              <InputUrl />
            </Grid.Column>
            <Grid.Column computer={16}>
              <InputLocal />
            </Grid.Column>
            <Grid.Column computer={16}>
              <Default />
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
          <Grid.Column computer={2}>
            <PhotoList />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({ photo: state.photo });

export default connect(mapStateToProps)(SelectPage);
