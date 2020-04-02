import React, {Component} from "react";
import {Navbar, Nav, NavbarBrand} from "react-bootstrap";
import {Link} from 'react-router-dom';
import PSU from '../images/gerb-psu.png'

export default class NavigationBar extends Component {
    render() {
        const marginRight = {
            marginRight: "10px"
        }
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src={PSU} alt="PSU should be here" width="40px" style={marginRight}/>
                     FIT
                </Link>
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Add Teacher</Link>
                    <Link to={"list"} className="nav-link">Look List </Link>
                </Nav>
            </Navbar>
        )
    }
}