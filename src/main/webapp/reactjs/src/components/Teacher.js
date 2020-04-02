import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo} from '@fortawesome/free-solid-svg-icons'

import {Card, Form, Button, Col} from "react-bootstrap";
import MyToast from "./MyToast";
import axios from 'axios';

export default class Teacher extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.teacherChange = this.teacherChange.bind(this);
        this.submitTeacher = this.submitTeacher.bind(this);
    }

    initialState = {
        id: '',
        firstName: '',
        secondName: '',
        patronymic: '',
        position: '',
        sex: '',
        date: ''
    }

    resetTeacher = () => {
        this.setState(() => this.initialState);
    }

    submitTeacher = event => {
        event.preventDefault();

        const teacher = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            patronymic: this.state.patronymic,
            position: this.state.position,
            sex: this.state.sex,
            date: this.state.date
        };

        axios.post("http://localhost:8080/createTeacher", teacher)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    }

    teacherChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children={{show: this.state.show, message:"Teacher Saved Successfully.", type:"success"}}/>
                </div>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> Add Teacher</Card.Header>
                    <Form onReset={this.resetTeacher} onSubmit={this.submitTeacher} id="teacherFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="firstName"
                                                  value={this.state.firstName}
                                                  onChange={this.teacherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Teacher First Name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Second Name</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="secondName"
                                                  value={this.state.secondName}
                                                  onChange={this.teacherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Teacher Second Name"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>Patronymic</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="patronymic"
                                                  value={this.state.patronymic}
                                                  onChange={this.teacherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Teacher Patronymic"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="position"
                                                  value={this.state.position}
                                                  onChange={this.teacherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Teacher Position"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Sex</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="sex"
                                                  value={this.state.sex}
                                                  onChange={this.teacherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Teacher Sex"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="date"
                                                  value={this.state.date}
                                                  onChange={this.teacherChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Teacher Date"/>
                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}