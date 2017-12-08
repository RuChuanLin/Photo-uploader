import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { uploadPhoto } from './actions/index';
import Header from './components/Header';
import Home from './components/Uploader';
import BlurTool from './components/Uploader/BlurTool';

const src = 'https://i.imgur.com/R3zp0nP.jpg';

class App extends Component {
  componentWillMount() {
    this.props.uploadPhoto(src);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/blurtool" component={BlurTool} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default connect(null, { uploadPhoto })(App);
