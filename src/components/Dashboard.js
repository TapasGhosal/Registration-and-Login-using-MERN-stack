import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginService from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
  COMMON_FIELDS,
  REGISTRATION_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from '../MessageBundle';

export default class Dashboard extends Component {

  render() {

    return (
      <div className="Dashboard">
        <h3> You are logged in! </h3>
      </div>
    );
  }
}
