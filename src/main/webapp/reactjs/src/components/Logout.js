import React, {Component} from "react";
import {Button, Form, Navbar} from "react-bootstrap";
import '../styles/style.css'
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import bindActionCreators from "redux/src/bindActionCreators";


class Logout extends Component {
    componentDidMount() {
        localStorage.setItem('loggedIn',false);
        this.props.dispatch({type: 'SET_LOGGED_IN', loggedIn: false});
    }
    render() {
        return (
                <div>
                    <Redirect to="/autorization"/>
                </div>
        )
    }
}

export default connect()(Logout)