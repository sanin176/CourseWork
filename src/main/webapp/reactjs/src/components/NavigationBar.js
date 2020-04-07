import React, {Component} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';
import PSU from '../images/fit-gerb.jpg'
import '../styles/style.css'

export default class NavigationBar extends Component {
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
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
                    </Nav>
                    <Nav className="ml-auto">
                        <NavDropdown.Divider />
                        {/*<Nav.Link href="autorization" className="signIn">sign in</Nav.Link>*/}
                        <Nav.Link href="autorization" className="mr-sm-2">sign in</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}