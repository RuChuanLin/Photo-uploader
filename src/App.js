import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Uploader';
import BlurTool from './components/Uploader/BlurTool';
import Cropper from './components/Uploader/Cropper';
import SelectPage from './components/Uploader/SelectPage';
import EditPage from './components/Uploader/EditPage';
import ResultPage from './components/Uploader/ResultPage';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={SelectPage} />
            <Route exact path="/edit" component={EditPage} />
            <Route path="/edit/cropper" component={Cropper} />
            <Route path="/edit/blur" component={BlurTool} />

            <Route path="/result" component={ResultPage} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
