import React, {Component} from 'react';
import Categories from './Categories/Categories';
import {connect} from 'react-redux';
import {Preloader} from 'react-materialize';
import classes from './Home.css';

class Home extends Component {
    render () {
        if(this.props.isProductsLoading || this.props.isUiLoading) {
            return (
                <div className={classes.loaderContainer}>
                    <Preloader size="small" />
                </div>
            )
        }
        return (
            <Categories />
        )
    }
}

const mapStateToProps = state => {
    return {
        isProductsLoading: state.ui.productsLoding,
        isUiLoading: state.ui.uiLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);