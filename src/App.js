import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Uploader';
import BlurTool from './components/Uploader/BlurTool';
import Cropper from './components/Uploader/Cropper';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/blurtool" component={BlurTool} />
            <Route path="/cropper" component={Cropper} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
