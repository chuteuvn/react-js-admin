import React, { Component } from 'react'
import { withRouter } from 'react-router'

let _history;
class history extends Component {
    componentDidMount() {
        _history = this.props.history;
    }
    render() {
        return null
    }
}

export default withRouter(history)
export const globalHistory = () =>_history;