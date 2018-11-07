import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Drawer from './../components/Drawer';
import ListBanksAccount from './../components/ListBanks';
import { globalHistory } from './../history';

export default class Banks extends Component {
    componentDidMount() {
        this.history = globalHistory();
    }
    render() {
        const { route } = this.props;
        return (
            <Drawer name={route.name}>
                {
                    route ? renderRoutes(route.routes) : this.props.children
                }
                <ListBanksAccount />
            </Drawer>
        )
    }
}
