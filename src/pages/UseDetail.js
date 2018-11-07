import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import Drawer from './../components/Drawer';
import Table from '../components/Table';
import { globalHistory } from './../history';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
    }
    componentDidMount() {
        this.history = globalHistory();
        console.log(this.history.location.state[0])
        this.setState({ user: this.history.location.state[0] })
    }

    render() {
        const { route } = this.props;
        const user = this.state.user;

        return (
            <Drawer name={route.name}>
                {
                    route ? renderRoutes(route.routes) : this.props.children
                }
                <div>
                    <Paper style={styles.root} elevation={1}>
                        <div style={styles.row}>
                            <Typography variant="headline" component="h3">
                                {user.fullName}
                            </Typography>
                            <Typography component="p" color='textSecondary'>
                                Ngày tạo: {user.created}
                            </Typography>
                        </div>
                        <Typography component="p">
                            {/* Thành phố: {user.city.id} */}
                        </Typography>
                        <Typography component="p">
                            Số xu hiện có:  {user.coinBalance}
                        </Typography>
                        <Typography component="p">
                            Email: {user.email ? user.email : 'chưa có'}
                        </Typography>
                        <Typography component="p">
                            Giới tính: {user.gender === 1 ? 'Nam' : 'Nữ'}
                        </Typography>
                        <Typography component="p">
                            Số điện thoại: {user.phoneNumber}
                        </Typography>
                        <Typography component="p">
                            Đánh giá: {user.rating} sao
                        </Typography>
                        <Typography component="p">
                            Giới tính: {user.gender === 1 ? 'Nam' : 'Nữ'}
                        </Typography>
                        <Typography component="p">
                            Cập nhật: {user.updated}
                        </Typography>
                        <Typography component="p">
                            Kiểu người dùng: {user.userType}
                        </Typography>
                        <Button variant="contained" color="primary" className={styles.button}>
                            Xác nhận
                        </Button>
                    </Paper>
                </div>
            </Drawer>
        )
    }
}

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
    row: {
        flexDirection: 'row'
    }
});

export default withStyles(styles)(Detail);