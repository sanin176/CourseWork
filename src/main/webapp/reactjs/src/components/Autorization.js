import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import '../styles/style.css'
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";


class Autorization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            afterAuthorization: false,
            name: 'Alex',
            login: "",
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handleSubmit = (e) => {
        console.log(this.state.login);
        console.log(this.state.password);
        this.state.login === "1" ?
            (this.state.password === "2" ?
                (this.props.dispatch({type: 'SET_LOGGED_IN', loggedIn: true}))
                : console.log("Error 2"))
            : console.log("Error 1");
    };

    handleLogin(e) {
        this.setState({login: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    render() {
        const marginBottom = {
            marginBottom: "60px"
        };

        return (
            this.props.loggedIn ?

                <div>
                    <Redirect to="/"/>
                </div>
                :
                <div className="jumbotron widthForm mx-auto" style={marginBottom}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={this.state.login} onChange={this.handleLogin}
                                          placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={this.state.password} onChange={this.handlePassword}
                                          placeholder="Password"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>
                        <Button onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                    <hr className="my-4"/>
                </div>
        );
    }
}

export default connect()(Autorization)