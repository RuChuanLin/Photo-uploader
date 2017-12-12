import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Step } from 'semantic-ui-react';
class Header extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div>
        <Step.Group ordered>
          <Link to="/">
            <Step completed={pathname === '/edit'}>
              <Step.Content>
                <Step.Title>選擇圖片</Step.Title>
                <Step.Description>Choosing a image</Step.Description>
              </Step.Content>
            </Step>
          </Link>
          <Link to="/edit">
            <Step>
              <Step.Content>
                <Step.Title>編輯圖片</Step.Title>
                <Step.Description>Editing your image</Step.Description>
              </Step.Content>
            </Step>
          </Link>
        </Step.Group>
      </div>
    );
  }
}

export default withRouter(Header);
