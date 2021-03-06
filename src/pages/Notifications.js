import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Drawer from './../components/Drawer';
import Table from '../components/Table';
import { globalHistory } from './../history';

export default class Notifications extends Component {
    componentDidMount() {
        this.history = globalHistory();
    }
    render() {
        const { route } = this.props;
        return (
            <Drawer name={this.props.route.name}>
                {
                    route ? renderRoutes(route.routes) : this.props.children
                }
                <div>
                    <h1>Danh sach thong bao</h1>
                </div>
            </Drawer>
        )
    }
}
