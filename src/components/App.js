import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, Link, useRouteMatch, useParams } from "react-router-dom";

import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';

class App extends Component {
  
  handleLogout = (e) => {
    sessionStorage.removeItem('isLoggedIn');
    console.log(localStorage.getItem('isLoggedIn'));
    localStorage.clear();
    this.props.history.push("/login");
    window.location.reload();
  };
  /* handleOnChangeUserName = (e) => {
    this.setState({
      user_name: e.target.value,
    });
  }; */
	render() {
		return (
				<Router>
					<div className="App">
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Device Management</Link>
              </div>
              <ul className="nav navbar-nav">
                {sessionStorage.getItem('isLoggedIn') ? (
                  <>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/logout" onClick={this.handleLogout}>Logout</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                  </>
                )}                
                
              </ul>
            </div>
          </nav>
					<Switch>
						<Route exact path="/register" component={Registration} />
						<Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
						<Redirect from="/" to="login" />
					</Switch>
					</div>
				</Router>
		);
	}
}
export default App;
