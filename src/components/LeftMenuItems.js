import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Dashboard from '@material-ui/icons/Dashboard';
import LocationCity from '@material-ui/icons/LocationCity';
import BanksIcon from '@material-ui/icons/Money';
import { withRouter } from "react-router";
import { globalHistory } from './../history';

class LeftMenuItems extends React.Component {
    componentDidMount() {
        this.history = globalHistory();
    }

    state = {
        selectedIndex: 0,
    };

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
    };

    render() {
        const pathname = this.props.location.pathname
        return (
            <div>
                <ListItem
                    button
                    selected={pathname == "/"}
                    onClick={() => {
                        this.history.push('/')
                    }}
                >
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Tổng quan" />
                </ListItem>

                <ListItem
                    button
                    selected={pathname == "/use"}
                    onClick={() => {
                        this.history.push('/use')
                    }}
                >
                    <ListItemIcon>
                        <SupervisorAccount />
                    </ListItemIcon>
                    <ListItemText primary="Người dùng" />

                </ListItem>

                <ListItem
                    button
                    selected={pathname == "/cities"}
                    onClick={() => {
                        this.history.push('/cities')
                    }}
                >
                    <ListItemIcon>
                        <LocationCity />
                    </ListItemIcon>
                    <ListItemText primary="Thành phố" />

                </ListItem>

                <ListItem
                    button
                    selected={pathname == "/banks"}
                    onClick={() => {
                        this.history.push('/banks')
                    }}
                >
                    <ListItemIcon>
                        <BanksIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ngân hàng" />

                </ListItem>
            </div>
        );
    }
}

export default withRouter(LeftMenuItems);