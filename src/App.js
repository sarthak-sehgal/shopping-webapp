import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import db from './firebaseConfig';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {BASE_URL} from './serverConfig';

import Layout from './components/Layout/Layout';
import Auth from './components/Auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   database: db
    // };
  }

  render() {
    return (
      <div>
        <Layout>
          <Route path={BASE_URL+"/auth"} exact component={Auth} />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));