import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Drawer from './../components/Drawer';

export default class Admin extends Component {
    render() {
        const { route } = this.props;
        return (
            <Drawer name={this.props.route.name}>
                {
                    route ? renderRoutes(route.routes) : this.props.children
                }
                <div>
                    <h1>Trang tổng quan</h1>
                </div>
            </Drawer>
        )
    }
}
