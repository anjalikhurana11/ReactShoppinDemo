import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";

class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props);
    localStorage.removeItem('user');
    let { history } = this.props;
    history.push("/login");
  }

  render() {
   //if (this.state.redirect) {
      return <Redirect to="/login" />;
    //}
  }
}

export default connect()(Logout);