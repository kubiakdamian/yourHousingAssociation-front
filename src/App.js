//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//Components
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home.js';

class App extends Component {
  render() {
    return (
		<Router>
			<Layout />
			<Route exact path="/" component={Home}/>
		</Router>
    );
  }
}

export default App;
