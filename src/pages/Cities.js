import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Drawer from './../components/Drawer';
import EnableCity from '../components/EnableCity';
import {connect} from 'react-redux';
import { mapActionsToProps } from './../redux/getCities';

class Cities extends Component {
    componentDidMount(){
        this.props.getAllCities();
    }
    render() {
        const { route } = this.props;
        return (
            <Drawer name={this.props.route.name}>
                {
                    route ? renderRoutes(route.routes) : this.props.children
                }
                <EnableCity />
            </Drawer>
        )
    }
}

const mapStateToProps = state => ({
    cities: state.getAllCities.cities
})

export default connect(mapStateToProps, mapActionsToProps)(Cities)