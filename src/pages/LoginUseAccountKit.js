import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";

import { mapActionsToProps } from './../redux/authentication';
import img from './../assets/logo.png'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        backgroundImage: 'radial-gradient(transparent, #dadada)'
    },
    paper: {
        width: 280,
        padding: 30,
        paddingLeft: 40,
        paddingRight: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        width: '100%',
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    logo: {
        width: 200,
        display: 'block',
        marginBottom: 10,
    },
    button: {
        marginTop:20
    }
});


class Login extends Component {
    constructor() {
        super()
        this.login = this.login.bind(this);
        this.loginWithAccountKit = this.loginWithAccountKit.bind(this);
    }
    state = {
        appVerified: false,
        phoneNumber: ''
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    loginWithAccountKit(token) {
        const code = token.code;
        this.props.login(code, 'accountkit', 'shipper')
    }

    login() {
        window.AccountKit.login('PHONE', {
            countryCode: '+84',
            phoneNumber: this.state.phoneNumber
        }, this.loginWithAccountKit);
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.root}
            >
                <Grid item>
                    <Paper className={classes.paper}>
                        <img src={img} className={classes.logo}/>
                        <Typography variant="headline">Đăng nhập</Typography>
                        <TextField
                            id="phone-number"
                            label="Số điện thoại *"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={e=>this.setState({phoneNumber: e.target.value})}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.login}>Xác minh</Button>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

Login =  withStyles(styles)(Login);

const mapStateToProps = state => ({
    user: state.authentication.user
})

Login = connect(mapStateToProps, mapActionsToProps)(Login)

export default Login;