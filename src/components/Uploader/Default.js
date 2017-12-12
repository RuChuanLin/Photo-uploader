import React, { Component } from 'react';
import { connect } from 'react-redux';

import { uploadPhoto, postPhoto } from '../../actions';
import { Input, Button, Header } from 'semantic-ui-react';
import line from '../../img/line.png';
import chiling from '../../img/Chi-Ling.jpg';
import guanxi from '../../img/Guan-Xi.jpg';
import andy from '../../img/Andy.jpg';

class Default extends Component {
  state = {};

  render() {
    return (
      <div>
        <Header>使用預設圖</Header>
        <Button onClick={() => this.props.uploadPhoto(line)}>Line對話</Button>
        <Button onClick={() => this.props.uploadPhoto(chiling)}>志玲</Button>
        <Button onClick={() => this.props.uploadPhoto(andy)}>德華</Button>
        <Button onClick={() => this.props.uploadPhoto(guanxi)}>冠希</Button>
      </div>
    );
  }
}

export default connect(null, { uploadPhoto })(Default);
