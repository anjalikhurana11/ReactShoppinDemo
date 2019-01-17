import React, { Component } from 'react';
import {  BrowserRouter as Router,  Route, Link,  Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { PrivateRoute } from './components/privateRoute';
import logo from './logo.svg';
import './App.css';
import Login from './components/loginPage/Login';
import Logout from './components/logoutPage/Logout';
import Products from './components/productPage/product';
import checkoutPage from './components/checkoutPage/checkout';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let user  = localStorage.getItem('user');
    
    let link;
    if(user || this.props.isLoginSuccess){
      link= <Link to="/logout">Logout</Link>;
    }else{
       link= <Link to="/login">Login</Link>;
    }
    return (
      <div className="App container">
        <Router >
          <div>
          <nav class="navbar navbar-inverse">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand" href="/">ReactDemo Site</a>
              </div>
              <ul class="nav navbar-nav">
                <li>{link}</li>
                <li> <Link to="/products">Products</Link></li>
                <li><Link to="/checkout">Cart</Link></li>
              </ul>
            </div>
          </nav>
            <Route path="/login" component={Login} />
            <Route path="/products" component={Products} /> 
            <Redirect from="/" to="Products" /> 
            <Route path="/logout" component={Logout} /> 
            <PrivateRoute path="/checkout" component={checkoutPage} />
          </div>
        </Router>
      </div>
    );
  }
}


export default connect()(App);
