import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { auth } from './../config/firebase';
import firebase from 'firebase';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%'
    },
});

class Login extends Component {
    state = {
        appVerified: false
    }

    componentWillMount() {

    }

    componentDidMount() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {
            'size': 'normal',
            'callback': (response) => {
                this.setState({ appVerified: true })
                var appVerifier = window.recaptchaVerifier;
                auth.signInWithPhoneNumber('+84975096810', appVerifier)
                    .then(function (confirmationResult) {
                        window.confirmationResult = confirmationResult;
                    }).catch(error => {
                        console.log(error)
                        this.setState({ appVerified: false })
                    });
            },
            'expired-callback': () => { this.setState({ appVerified: false }) }
        });
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });
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
                    <Paper>
                        <div ref={(ref) => this.recaptcha = ref} data-sitekey="6LfDOHIUAAAAAIs9Vywxu3h_Dm8z4cr7I00HGKth"></div>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);