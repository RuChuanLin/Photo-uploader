import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../actions';
import { Input, Button, Header } from 'semantic-ui-react';
class InputUrl extends Component {
  state = {
    photoUrl: ''
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.uploadPhoto(this.state.photoUrl);
  };

  onInputChange = value => {
    this.setState({ photoUrl: value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Header>URL上傳</Header>
        <Input
          value={this.state.photoUrl}
          onChange={e => this.onInputChange(e.target.value)}
          placeholder="Search..."
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    photo: state.photo
  };
}

export default connect(mapStateToProps, { uploadPhoto })(InputUrl);
