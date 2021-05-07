import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './style.css'
import Login from './Auth/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './NavBar';
import SignUp from './Auth/SignUp';
import Home from './Home';
import Contact from './Contact';
import Blog from './Blog';
import Info from './Info';
import LandingPage from './LandingPage';
import ResetPassword from './Auth/Reset';
import Search from './Search';
import NotAvailable from './NotAvailable';
import MapView from './MapView';
import Property from './Property';


class App extends Component {

  componentDidMount() {
    const authToken = localStorage.getItem('jwtToken');
    if (authToken) {
      
    }
  }
  render() {
    return (
        <Router >
          <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route>
              <NavBar />
              <Switch>
                <Route path="/contact">
                    <Contact />
                </Route>
                <Route path="/blog">
                  <Blog />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <SignUp />
                </Route>
                <Route path="/info/:info">
                  <Info />
                </Route>
                <Route path="/reset-password/:token">
                  <ResetPassword />
                </Route> 
                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/search/ahmedabad" >
                  <Search />
                </Route>
                <Route path="/search">
                  <NotAvailable />
                </Route>
                <Route path="/MapView">
                  <MapView />
                </Route>
                <Route path="/property/:id">
                  <Property />
                </Route>
              </Switch>
              </Route>
            </Switch>
          <ToastContainer />
        </Router>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(App);
