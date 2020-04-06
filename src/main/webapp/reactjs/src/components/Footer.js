import React, {Component} from "react";
import {Col, Container, Navbar} from "react-bootstrap";

export default class Footer extends Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullYear - 1} - {fullYear}, All Right Reserved by Almighty Java</div>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}