import React from 'react';
import { SideNav, SideNavItem, Button } from 'react-materialize';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Aux from '../../hoc/Aux';
// import NavBar from '../Navigation/NavBar/NavBar';
import classes from './Layout.css';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Aux>
        {/* <NavBar /> */}
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default withRouter(connect(null, mapDispatchToProps)(Layout));