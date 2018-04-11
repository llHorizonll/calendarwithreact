import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router-dom'
import './index.css';
import App from './App';
import LoginPage from './Login';
import RegisterPage from './Register';
import registerServiceWorker from './registerServiceWorker';
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

ReactDOM.render(
  <Router history={history}>
    <div>
      <PrivateRoute path='/' exact component={App} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </div>
  </Router>, document.getElementById('root'));
registerServiceWorker();
