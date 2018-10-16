import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Auth extends Component {
    render () {
        return (
            <div>
                Auth Screen
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps))(Auth);