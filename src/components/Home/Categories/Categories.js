import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-materialize';

class Categories extends Component {
    render() {
        let categories = null;
        if(this.props.categories) {
            categories = this.props.categories.map((category, index) => {
                return <Tab title={category} active={index===0 ? true : false}>{category}</Tab>
            })
        }
        return (
            <Tabs className='tab-demo z-depth-1'>
                {categories}
            </Tabs>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.products.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);