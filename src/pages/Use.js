import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Drawer from './../components/Drawer';
import Table from '../components/Table';
import { mapActionsToProps } from './../redux/user';
import { connect } from 'react-redux';

class Use extends Component {
    componentDidMount() {
        this.props.getUsers(0, 10, 'all', null);
    }

    render() {
        const { route } = this.props;
        return (
            <Drawer name={this.props.route.name}>
                {
                    route ? renderRoutes(route.routes) : this.props.children
                }
                <Table />
            </Drawer>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users.users
})

export default connect(mapStateToProps, mapActionsToProps)(Use)