import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Login from './../pages/LoginUseAccountKit';
import { connect } from 'react-redux'
import Admin from './Admin';
import History from './../history';

class Empty extends Component {
    render() {
        const { route, user, ready } = this.props;
        // if (!ready) {
        //     return null;
        // }
        // if (!user) {
        //     return <Login />
        // }
        return (
            <React.Fragment>
                <History />
                {
                    route ? renderRoutes(route.routes) : this.props.children
                }
            </React.Fragment>
            // <Admin />
        )
    }
}

Empty = connect(state => ({
    user: state.authentication.user,
    ready: state.authentication.ready
}))(Empty)

export default Empty;