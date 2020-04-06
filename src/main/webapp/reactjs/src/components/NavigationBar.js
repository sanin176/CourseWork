import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';
import PSU from '../images/fit-gerb.jpg'

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

                    <Link to={"addDis"} className="nav-link">Add Discipline</Link>
                    <Link to={"listDis"} className="nav-link">Look List Discipline</Link>

                    <Link to={"addFix"} className="nav-link">Add Fixing</Link>
                    <Link to={"listFix"} className="nav-link">Look List Fixing</Link>
                </Nav>
            </Navbar>
        )
    }
}