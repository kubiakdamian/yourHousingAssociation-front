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
import Charges from './TenantPanel/Charges';
import AddManager from './AdminPanel/AddManager';
import ManageManagers from './AdminPanel/ManageManagers';
import AddArticle from './AdminPanel/AddArticle';
import UnverifiedTenants from './ManagerPanel/UnverifiedTenants';
import FeesToAccept from './ManagerPanel/FeesToAccept';
import {IntlProvider} from 'react-intl';
import { connect } from 'react-redux';
import messages from './messages';


class App extends Component {
  render() {
    return (
    <IntlProvider 
      locale="pl" 
      messages={ messages[this.props.language] }> 
      <Router>
        <Layout />
        <Route exact path="/" component={Home}/>
        <Route path="/signIn" component={SignIn}/>
        <Route path="/signUp" component={SignUp}/>
        <Route path="/charges" component={Charges}/>
        <Route path="/addManager" component={AddManager} />
        <Route path="/managers" component={ManageManagers} />
        <Route path="/addArticle" component={AddArticle} />
        <Route path="/unverifiedTenants" component={UnverifiedTenants} />
        <Route path="/notAcceptedFees" component={FeesToAccept} />
        <NotificationContainer />
      </Router>
    </IntlProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.lang.language.language
  };
};

export default connect(mapStateToProps)(App);
