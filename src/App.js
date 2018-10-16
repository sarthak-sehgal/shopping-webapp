import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import db from './firebaseConfig';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {BASE_URL} from './serverConfig';

import Layout from './components/Layout/Layout';
import Auth from './components/Auth/Auth';
import AddProduct from './components/AddProduct/AddProduct';

import { getUsers, getUser } from './store/actions/index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={BASE_URL+"/auth"} exact component={Auth} />
            <Route path={BASE_URL+"/add"} exact component={AddProduct} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
    getUser: () => dispatch(getUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));