import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import db from './firebaseConfig';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {BASE_URL} from './serverConfig';

import Layout from './components/Layout/Layout';
import Auth from './components/Auth/Auth';
import AddProduct from './components/AddProduct/AddProduct';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Addresses from './components/Addresses/Addresses';
import Order from './components/Order/Order';
import Orders from './components/Orders/Orders';

import { getUsers, getUser, getCategories, getProducts, getCart } from './store/actions/index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProducts();
    this.props.getUser();
    this.props.getUsers();
    this.props.getCategories();
    this.props.getCart();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path={BASE_URL+"/"} exact component={Home} />
            <Route path={BASE_URL+"/auth"} exact component={Auth} />
            <Route path={BASE_URL+"/add"} exact component={AddProduct} />
            <Route path={BASE_URL+"/cart"} exact component={Cart} />
            <Route path={BASE_URL+"/addresses"} exact component={Addresses} />
            <Route path={BASE_URL+"/order"} exact component={Order} />
            <Route path={BASE_URL+"/orders"} exact component={Orders} />
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
    getUser: () => dispatch(getUser()),
    getCategories: () => dispatch(getCategories()),
    getProducts: () => dispatch(getProducts()),
    getCart: () => dispatch(getCart())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));