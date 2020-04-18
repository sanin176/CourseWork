import React, {Component} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';
import PSU from '../images/fit-gerb.jpg'
import '../styles/style.css'
import {connect} from "react-redux";

class NavigationBar extends Component {
    componentDidMount() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
        this.props.dispatch({type: 'SET_LOGGED_IN', loggedIn: loggedInUser});
    }

    render() {
        const marginRight = {
            marginRight: "10px"
        };

        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand>
                    <Link to={""} className="navbar-brand">
                        <img src={PSU} alt="PSU should be here" width="40px" style={marginRight}/>
                        FIT
                    </Link>
                    <Link to={"pageTeacher"} className="navbar-brand">
                        [Main Page]
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>


                <Navbar.Collapse>
                    {console.log("NavigationBar -> " + this.props.loggedIn)}
                    {
                        (this.props.loggedIn) &&
                        <Nav className="mr-auto">
                            <NavDropdown title="Teacher" id="basic-nav-dropdown" style={marginRight}>
                                <NavDropdown.Item href="add">Add Teacher</NavDropdown.Item>
                                <NavDropdown.Item href="list">Look List Teacher</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Discipline" id="basic-nav-dropdown" style={marginRight}>
                                <NavDropdown.Item href="addDis">Add Discipline</NavDropdown.Item>
                                <NavDropdown.Item href="listDis">Look List Discipline</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Fixing" id="basic-nav-dropdown" style={marginRight}>
                                <NavDropdown.Item href="addFix">Add Fixing</NavDropdown.Item>
                                <NavDropdown.Item href="listFix">Look List Fixing</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown.Divider/>
                        </Nav>

                    }
                    <Nav className="ml-auto">
                        {(this.props.loggedIn) ?
                            <Nav.Link href="logout" className="mr-sm-2">
                                Logout
                            </Nav.Link>
                            :
                            <Nav.Link href="autorization" className="mr-sm-2">
                                sign in
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        )
    }
}

export default connect()(NavigationBar)