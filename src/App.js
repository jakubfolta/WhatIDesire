import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './store/actions';

import Layout from './components/Layout/Layout';
import Home from './containers/Pages/Home';
import Logout from './containers/Pages/Auth/Logout/Logout';

const Auth = React.lazy(() => import('./containers/Pages/Auth/Auth'));
const Items = React.lazy(() => import('./containers/Pages/Items'));

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render() {
    const authSuspense = <Suspense fallback=<div>Loading...</div>><Auth /></Suspense>
    const itemsSuspense = <Suspense fallback=<div>Loading...</div>><Items /></Suspense>

    let routes = this.props.isAuthenticated
      ? <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" render={() => authSuspense}  />
        <Route path="/logout" component={Logout}  />
        <Route path="/items" render={() => itemsSuspense} />
        <Redirect to="/" />
      </Switch>
      : <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" render={() => authSuspense}  />
        {/* "items" available for development purposes */}
        <Route path="/items" render={() => itemsSuspense} />
        <Redirect to="/" />
      </Switch>

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(authActions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
