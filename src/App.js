//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//Notifications
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
//Components
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home.js';
import SignIn from './Session/SignIn';
import SignUp from './Session/SignUp';
import Charges from './Charges/Charges';


class App extends Component {
  render() {
    return (
		<Router>
			<Layout />
			<Route exact path="/" component={Home}/>
      <Route path="/signIn" component={SignIn}/>
      <Route path="/signUp" component={SignUp}/>
      <Route path="/charges" component={Charges}/>
      <NotificationContainer />
		</Router>
    );
  }
}

export default App;
