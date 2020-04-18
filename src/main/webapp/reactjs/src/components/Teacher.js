import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons'

import {Card, Form, Button, Col} from "react-bootstrap";
import MyToast from "./MyToast";
import axios from 'axios';

export default class Teacher extends Component {
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.teacherChange = this.teacherChange.bind(this);
        this.submitTeacher = this.submitTeacher.bind(this);
        this.handleSexName = this.handleSexName.bind(this);
        this.handlePositionName = this.handlePositionName.bind(this);
    }

    initialState = {
        id: '',
        firstName: '',
        secondName: '',
        patronymic: '',
        position: "0",
        sex: "0",
        date: ''
    };

    componentDidMount() {
        const teacherId = +this.props.match.params.id;
        console.log(teacherId);
        if (teacherId) {
            this.findTeacherById(teacherId);
        }
    }

    findTeacherById = (teacherId) => {
        axios.get('http://localhost:8080/teacher/' + teacherId)
            .then(response => {
                console.log("Response: " + response.data + "!");
                if (response.data != null) {
                    console.log(response.data);
                    this.setState({
                        id: response.data.id,
                        firstName: response.data.firstName,
                        secondName: response.data.secondName,
                        patronymic: response.data.patronymic,
                        position: response.data.position,
                        sex: response.data.sex,
                        date: response.data.date.replace(/(\d+).(\d+).(\d+).*/, '$1-$2-$3')
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        });
    };

    resetTeacher = () => {
        this.setState(() => this.initialState);
    };

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
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    };

    updateTeacher = event => {
        event.preventDefault();

        const teacher = {
            id: this.state.id,
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            patronymic: this.state.patronymic,
            position: this.state.position,
            sex: this.state.sex,
            date: this.state.date
        };

        axios.put("http://localhost:8080/putTeacher", teacher)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.teacherList(), 3000);
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    };

    teacherChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    teacherList = () => {
        return this.props.history.push("/list");
    };

    handleSexName = e => {
        this.setState({optionsHandleSexName: e.target.value});
        e.target.blur();
    };

    handlePositionName = e => {
        this.setState({optionsHandlePositionName: e.target.value});
        e.target.blur();
    };

    render() {
        const marginBottom = {
            marginBottom: "60px"
        };

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={this.state.method === "put" ? "Teacher Update Successfully." : "Teacher Saved Successfully."}
                             type={"success"}/>
                </div>

                <Card className={"border border-dark bg-light text-dark"} style={marginBottom}>
                    <Card.Header><FontAwesomeIcon
                        icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Teacher" : "Add Teacher"}
                    </Card.Header>
                    <Form onReset={this.resetTeacher} onSubmit={this.state.id ? this.updateTeacher : this.submitTeacher}
                          id="teacherFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required
                                                  type="test"
                                                  name="firstName"
                                                  value={this.state.firstName}
                                                  onChange={this.teacherChange}
                                                  className={"bg-light text-primary"}
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
                                                  className={"bg-light text-primary"}
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
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Teacher Patronymic"/>
                                </Form.Group>
                            </Form.Row>
                            {/*<Form.Row>*/}

                            {/*    <Form.Group as={Col} controlId="formGridPrice">*/}
                            {/*        <Form.Label>Position</Form.Label>*/}
                            {/*        <Form.Control required*/}
                            {/*                      type="test"*/}
                            {/*                      name="position"*/}
                            {/*                      value={this.state.position}*/}
                            {/*                      onChange={this.teacherChange}*/}
                            {/*                      className={"bg-light text-primary"}*/}
                            {/*                      placeholder="Enter Teacher Position"/>*/}
                            {/*    </Form.Group>*/}
                            {/*</Form.Row>*/}
                            {/*<Form.Row>*/}

                            {/*    <Form.Group as={Col} controlId="formGridLanguage">*/}
                            {/*        <Form.Label>Sex</Form.Label>*/}
                            {/*        <Form.Control required*/}
                            {/*                      type="test"*/}
                            {/*                      name="sex"*/}
                            {/*                      value={this.state.sex}*/}
                            {/*                      onChange={this.teacherChange}*/}
                            {/*                      className={"bg-light text-primary"}*/}
                            {/*                      placeholder="Enter Teacher Sex"/>*/}
                            {/*    </Form.Group>*/}
                            {/*</Form.Row>*/}

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Position</Form.Label>
                                    <select className="form-control"
                                            onChange={this.handlePositionName}
                                            value={this.state.position}
                                    >
                                        <option value={"0"} disabled>Select Position Name</option>
                                        <option value={"TraineeTeacher"}>TraineeTeacher</option>
                                        <option value={"Assistant"}>Assistant</option>
                                        <option value={"SeniorLecturer"}>SeniorLecturer</option>
                                        <option value={"AssistantProfessor"}>AssistantProfessor</option>
                                        <option value={"Professor"}>Professor</option>
                                        <option value={"Doctor"}>Doctor</option>
                                    </select>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Sex</Form.Label>
                                    <select className="form-control"
                                            onChange={this.handleSexName}
                                            value={this.state.sex}
                                    >
                                        <option value={"0"} disabled>Select Sex Name</option>
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                    </select>
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
                                                  className={"bg-light text-primary"}
                                                  placeholder="Enter Teacher Date"/>
                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.teacherList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Teacher List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
}